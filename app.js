var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db');

// load environment variables
var env = require('node-env-file');
env(__dirname + '/.env');

var routes = require('./routes/index');
var schedule = require('./routes/schedule');
var devices = require('./routes/devices');
var phones = require('./routes/phones');
var users = require('./routes/users');
var passes = require('./routes/passes');

var app = express();

// set environment
if (process.env.ENVIRONMENT !== 'dev')
  app.set('env', 'production');

// database connection setup
db.connect(function (err) {
  if (err)
    console.log('Unable to connect to the database.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/schedule', schedule);
app.use('/devices', devices);
app.use('/phones', phones);
app.use('/users', users);
app.use('/passes', passes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
