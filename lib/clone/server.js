var express        = require('express'),
    http           = require('http'),
    path           = require('path'),
    favicon        = require('static-favicon'),
    logger         = require('morgan'),
    partials       = require('express-partials'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    csrf           = require('csurf'),
    session        = require('express-session'),
    auth           = require('./config/authentication'), // Authentication credentials
    env            = process.env.ENV || 'development';   // Set development by default

// Initialize express
var app = express();

// Connect to database
require('./config/database').mongo();

app.set('port', process.env.PORT || 3838);

// view engine setup
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(partials());
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser("keyboard dog"));
app.use(session({secret: 'keyboard cat'}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf());
// Set local token
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  return next();
});

// Development only
if ('development' == env) {
  // Stack tracing errors in command line
  app.use(errorHandler());
  // Log everything beautifully
  app.use(logger('dev'));
}

// Production only
if('production' == env) {
  // Log the necessary
  app.use(logger('short'));
}

// Hook up router
var router = require('./config/router.js')(app);

// Boot server
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});