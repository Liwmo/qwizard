var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('./routes/authentication');

var login = require('./routes/login');
var users = require('./routes/users');
var verify = require('./routes/verify');
var api = require('./routes/api');
var tests = require('./routes/tests');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.png'));

app.use(logger(':date  User IP: :remote-addr ":method :url HTTP/:http-version" - :status'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', login);
app.use('/maker/*', auth.authenticateCookie, auth.authenticateMaker);
app.use('/taker/*', auth.authenticateCookie);
app.use('/verify', verify);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/tests', tests);
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

// Handlers for error events
// app.listen(443, 'localhost', function() {
//     console.log("443 ~ ~");
// }).on('error', function(err){
//     console.log('on error handler');
//     console.log(err);
// });


process.on('uncaughtException', function(err) {
    console.log('process.on handler');
    console.log(err);
});


module.exports = app;
