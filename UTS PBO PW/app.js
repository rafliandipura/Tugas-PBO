const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./auth');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use authentication routes
app.use('/', authRoutes);

// Landing page route
app.get('/', (req, res) => {
    res.render('landing');
});

// Profile page route
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    // Fetch data related to players, coaches, and statistics
    db.query('SELECT * FROM pemain', (err, pemain) => {
        if (err) return res.status(500).send('Error fetching player data.');

        db.query('SELECT * FROM pelatih', (err, pelatih) => {
            if (err) return res.status(500).send('Error fetching coach data.');

            db.query('SELECT * FROM statistik_tim', (err, statistik) => {
                if (err) return res.status(500).send('Error fetching team statistics.');

                db.query('SELECT * FROM trofi', (err, trofi) => {
                    if (err) return res.status(500).send('Error fetching trophies.');

                    res.render('profile', { user: req.session.user, pemain, pelatih, statistik, trofi });
                });
            });
        });
    });
});

// Route for displaying players
app.get('/pemain', (req, res) => {
    db.query('SELECT * FROM pemain', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.render('pemain', { pemain: results });
    });
});

// Route for displaying coaches
app.get('/pelatih', (req, res) => {
    db.query('SELECT * FROM pelatih', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.render('pelatih', { pelatih: results });
    });
});

// Route for displaying trophies
app.get('/trofi', (req, res) => {
    db.query('SELECT * FROM trofi', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.render('trofi', { trofi: results });
    });
});

// Route for adding a trophy
app.post('/trofi/add', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;

    db.query(
        'INSERT INTO trofi (nama_trofi, musim, jumlah_trofi, pelatih_id) VALUES (?, ?, ?, ?)',
        [nama_trofi, musim, jumlah_trofi, pelatih_id],
        (err) => {
            if (err) {
                console.error("Error adding trophy:", err);
                return res.status(500).send('An error occurred while adding the trophy.');
            }
            res.redirect('/trofi'); // Redirect to trophies page after adding
        }
    );
});

// Route for updating a trophy
app.post('/trofi/update/:id', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;
    const id_trofi = req.params.id;

    db.query(
        'UPDATE trofi SET nama_trofi = ?, musim = ?, jumlah_trofi = ?, pelatih_id = ? WHERE id_trofi = ?',
        [nama_trofi, musim, jumlah_trofi, pelatih_id, id_trofi],
        (err) => {
            if (err) {
                console.error("Error updating trophy:", err);
                return res.status(500).send('An error occurred while updating the trophy.');
            }
            res.redirect('/trofi'); // Redirect to trophies page after updating
        }
    );
});

// Route for deleting a trophy
app.post('/trofi/delete/:id', (req, res) => {
    const id_trofi = req.params.id;

    db.query('DELETE FROM trofi WHERE id_trofi = ?', [id_trofi], (err) => {
        if (err) {
            console.error("Error deleting trophy:", err);
            return res.status(500).send('An error occurred while deleting the trophy.');
        }
        res.redirect('/trofi'); // Redirect to trophies page after deleting
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
