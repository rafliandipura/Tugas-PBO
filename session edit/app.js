const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();

// Set EJS sebagai template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check login status
app.use((req, res, next) => {
    if (!req.session.user && req.path !== '/auth/login' && req.path !== '/auth/register') {
        // If the user is not logged in and trying to access any other page except login/register
        return res.redirect('/auth/login');
    } else if (req.session.user && req.path === '/') {
        // If user is logged in and tries to access the root route, redirect to profile
        return res.redirect('/auth/profile');
    }
    next();
});

// Routes
app.use('/auth', authRoutes);

// Root Route: Redirect to /auth/login or /auth/profile based on session
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/auth/profile');
    } else {
        return res.redirect('/auth/login');
    }
});

// Menjalankan Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
