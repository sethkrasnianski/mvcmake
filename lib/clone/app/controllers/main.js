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
  res.render('main/portal', {title: "Scrumptious - Delicious agile communication."});
};


//
// Main - /signup GET
//
exports.signup = function(req, res, next) {
  res.render('main/portal', {title: "Scrumptious - Delicious agile communication."});
};


//
// Main - /logout GET
//
exports.logout = function(req, res, next) {
  res.render('main/index', {title: "Logout"});
};