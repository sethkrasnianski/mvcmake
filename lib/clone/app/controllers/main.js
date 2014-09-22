// *** CONTROLLER *** //
//
// Main - / GET
//
exports.index = function(req, res, next) {
  res.render('main/index', {title: "Your Title"});
};


//
// Main - /login GET
//
exports.login = function(req, res, next) {
  res.render('main/index', {title: "Login"});
};


//
// Main - /signup GET
//
exports.signup = function(req, res, next) {
  res.render('main/index', {title: "Signup"});
};


//
// Main - /logout GET
//
exports.logout = function(req, res, next) {
  res.render('main/index', {title: "Logout"});
};