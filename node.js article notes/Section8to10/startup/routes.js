const express = require('express');
const movies = require('../routes/movies');
const home = require('../routes/home');
const users = require('../routes/users');
const auth = require('../routes/auth');
const errorHandling  = require('../middleware/error');
const helmet = require('helmet');
const authentication  = require('../middleware/mware');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/movies', movies) // Any route which starts with /api/movies, then use the router movies defined above.
    app.use('/api/users', users) // Any route which starts with /api/users, then use the router movies defined above.
    app.use('/api/auth', auth) // Any route which starts with /api/auth, then use the router movies defined above.
    app.use('/', home) // Any route which starts with /, then use the router home defined above.
    app.use(errorHandling); // Error Handler

    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
    app.use(helmet());
    app.use(authentication);

    // PUG Engines
    app.set('views', './views');
    app.set('view engine', 'pug');

    // Custom Middleware Integration
    app.use(function(req, res, next){
        console.log('Logging request...');
        next(); // Pass control to the next middleware; otherwise stuck
    })
    console.clear()
}