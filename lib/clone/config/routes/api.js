// namespace  - api
// vendor
var express   = require('express'),
    route     = new express.Router(),
    session   = require('../../app/controllers/sessions'),
    user      = require('../../app/controllers/user'),
    auth      = require('../../lib/middleware/authentication');

// Sessions Authentication
route.post('/login', session.create);
route.get('/logout', session.delete);
route.get('/check', session.check);

// User CRUD
// Read all user
route.get('/user', auth, user.findAll); // Check authentication
// Create User
route.post('/user', user.create);
// Get user by ID
route.get('/user/:id', auth, user.findById); // Check authentication
// Update user by ID
route.put('/user/:id', auth, user.update); // Check authentication
// Delete user by ID
route.delete('/user/:id', auth, user.delete); // Check authentication
// Reset user password
route.put('/reset', user.reset);

module.exports = route;