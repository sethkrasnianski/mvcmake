// Utilities
var crypt = require('../../lib/crypt');
//
//  Load User model
//
var User = require('../models/user').model

// *** CONTROLLER *** //
//
// User - /login POST
//
exports.create = function(req, res, next) {
  var _user;
  _user = req.body.user;
  User.find({ email: _user.email}, function (err, user) {
    if (!err) {
      user = user[0];
      if (user) {
        if (_user.password === crypt.decrypt(user.password)) {
          req.session.user_id = user._id;
          res.locals.loggedIn = true;

          if (_user.permission) {
            req.session.super = true;
            return res.send({status: "Successfully Logged In", loggedIn: true, super: true});
          } else {
            req.session.super = false;
            return res.send({status: "Successfully Logged In", loggedIn: true, super: false});
          };
        } else {
          console.log(err)
          res.status(403);
          res.send({error: "Incorrect Password"});
        };
      } else {
        res.status(403);
        res.send({error: "Access Denied"});
      };
    } else {
      return res.send(err);
      return console.log(err);
    }
  });
};


//
// User - /logout DELETE
//
exports.delete = function(req, res, next) {
  delete req.session.user_id;
  return res.redirect('/login');
};


//
// User - /check DELETE
//
exports.check = function(req, res, next) {
  if (req.session.user_id) {
    res.send({loggedIn: true, id: req.session.user_id});

  } else {
    res.send({loggedIn: false});
  };
};