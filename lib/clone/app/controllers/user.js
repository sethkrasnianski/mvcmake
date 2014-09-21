// Encryption
var crypt  = require('../../lib/crypt');
var crypto = require('crypto');
var async  = require('async');
var auth   = require('../../config/authentication.json');

//
//  Load User model
//
var User = require('../models/user').model

// *** CONTROLLER *** //
//
// User - /user GET
//
exports.findAll = function(req, res, next) {
  User.find()
  .exec(function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return res.send(err);
      return console.log(err);
    }
  });
};


//
// User - /user/:id GET
//
exports.findById = function(req, res, next) {
  User.findById(req.params.id)
  .exec(function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return res.send(err);
      return console.log(err);
    }
  });
};


//
// User - /user POST
//
exports.create = function(req, res, next) {
      // Current user
  var user_id = req.session.user_id,
      // Super user
      _super  = req.session.super,
      // Requested user
      _user   = req.body.user;

  User.findOne({ email: _user.email}, function (err, user) {
    if (!err) {
      if (user) {
        res.status(403);
        res.send({error: "You've already signed up, silly."});
      } else {
        // Build User
        user = new User({
          email: _user.email,
          photo: _user.photo,
          name: {
            first: _user.name.first,
            last: _user.name.last
          },
          password: crypt.encrypt(_user.password),
          created_at: Date.now()
        });

        if (_super) {
          user.permission = _user.permission;
        };

        // Save User
        user.save(function (err, user, count) {
          if (!err) {
            req.session.user_id = user._id;
            res.send({status: "Welcome!", loggedIn: true});
          } else {
            res.status(403);
            res.send(err);
          };
        });
      };
    } else {
      return res.send(err);
      return console.log(err);
    }
  });
};


//
// User - /user/:id PUT
//
exports.update = function(req, res, next) {
      // Current user
  var user_id  = req.session.user_id,
      // Super user
      _super   = req.session.super,
      // Requested user
      _user_id = req.params.id;
      _user    = req.body.user;

  // Update User
  User.findById(req.params.id, function (err, user) {
    user.photo        = _user.photo;
    user.email        = _user.email;
    user.photo        = _user.photo;
    user.name.first   = _user.name.first;
    user.name.last    = _user.name.last;
    if (_user.password) {
      user.password   = crypt.encrypt(_user.password);
    };
    if (_super) {
      user.permission = _user.permission;
    };
    user.modified_at  = Date.now();

    // Prevent cross editing
    if (user_id === _user_id) {
      // Update user
      user.save(function (err) {
        if (err) res.send(err)
        console.log(req.session.user_id + " updated");
        res.send(user);
      });
    } else {
      res.status(403);
      res.send({error: "You're attempting to edit a user other than yourself."});
    }
  });
};


//
// User - /user/:id DELETE
//
exports.delete = function(req, res, next) {
  User.findById(req.params.id)
  .exec(function (err, user) {
    return User.remove(function (err) {
      if (!err) {
        console.log("removed user " + req.params.id);
        return res.send("removed user " + req.params.id);
      } else {
        console.log(err);
      }
    });
  });
};

// User - /reset PUT

exports.reset = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          res.send(403, "No account with that email address exists.")
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: auth.email
      });
      var mailOptions = {
        to: user.email,
        from: 'seth@sjkstudios.com',
        subject: 'Password reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.send({status: "success", message: "An e-mail has been sent to ' + user.email + ' with further instructions."})
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    var is_ajax_request = req.xhr;
    if (is_ajax_request) {
      res.send(403, {status: "error", error: err});
    };
  });
};