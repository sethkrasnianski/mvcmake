module.exports = function(app) {

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.send(err.message);
    });
  }

  // Main
  app.use('/', require('./routes/main'));
  // API
  app.use('/api', require('./routes/api'));

  // 404
  app.use(function(req, res, next) {
    var err = new Error(req.originalUrl + 'Not Found');
    err.status = 404;
    next(err);
  });

};