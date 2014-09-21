// vendor
var express = require('express'),
    route   = new express.Router(),
    main    = require('../../app/controllers/main'),
    auth    = require('../../lib/middleware/authentication');

// Site
route.get('/', auth, main.index);
// Sessions
route.get('/login', main.login);
route.get('/signup', main.signup);
route.get('/logout', main.logout);
route.get('/logout', main.logout);

module.exports = route;