const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('./db');

// Route: Login - Get form
router.get('/login', (req, res) => res.render('login'));

// Route: Login - Post form
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send('Please enter both email and password.');
    }

    try {
        // Query the database to find the user by email
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error("Error fetching user:", err);
                return res.status(500).send('Server error');
            }

            if (results.length === 0) {
                return res.send('No user found with that email.');
            }

            const user = results[0];

            // Compare the input password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.send('Incorrect password.');
            }

            // Store user data in the session
            req.session.user = { id: user.id, name: user.name, email: user.email };

            // Redirect to profile page
            res.redirect('/profile');
        });
    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).send('Server error');
    }
});

// Route: Profile - Show user profile and data from other tables
router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    // Queries to fetch data from pemain, pelatih, statistik_tim, and trofi tables
    const pemainQuery = 'SELECT * FROM pemain';
    const pelatihQuery = 'SELECT * FROM pelatih';
    const statistikQuery = 'SELECT * FROM statistik_tim';
    const trofiQuery = 'SELECT * FROM trofi';

    db.query(pemainQuery, (err, pemain) => {
        if (err) return res.status(500).send('Error fetching players data.');

        db.query(pelatihQuery, (err, pelatih) => {
            if (err) return res.status(500).send('Error fetching coach data.');

            db.query(statistikQuery, (err, statistik) => {
                if (err) return res.status(500).send('Error fetching team stats data.');

                db.query(trofiQuery, (err, trofi) => {
                    if (err) return res.status(500).send('Error fetching trophy data.');

                    res.render('profile', {
                        user: req.session.user,
                        pemain,
                        pelatih,
                        statistik,
                        trofi
                    });
                });
            });
        });
    });
});

// Route: Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/login');
    });
});

module.exports = router;
