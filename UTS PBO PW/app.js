const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./auth');
const db = require('./db');

const app = express();
const PORT = 3000;

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

// Profile route with authentication check
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        // Redirect to login if the user is not authenticated
        return res.redirect('/login');
    }

    const userId = req.session.user.id;
    
    // Fetch swim data for the logged-in user
    db.query('SELECT * FROM swims WHERE user_id = ?', [userId], (err, swims) => {
        if (err) {
            console.error("Error fetching swims:", err);
            return res.status(500).send('An error occurred while fetching swim data.');
        }
        
        // Render profile page with user and swim data
        res.render('profile', { user: req.session.user, swims });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
