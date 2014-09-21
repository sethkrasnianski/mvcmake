module.exports = function(req, res, next) {
  if(req.session.user_id) {
    next();
  } else {
    var is_ajax_request = req.xhr;
    if (req.hxr) {
      res.send(403, {status: "Error", message: "Not authenticated"});
    } else {
      res.redirect('/login');
    };
    console.log({status: "Error", message: "Not authenticated"});
  }
}