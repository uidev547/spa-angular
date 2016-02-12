var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var auth = require('./routes/auth');
var upload = require('./routes/upload');
var users = require('./routes/users');
var cp = require('./routes/content-partners');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sampleApp');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost/sampleApp',
        ttl: 100 * 24 * 60 * 60 // 100 days
    }),
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes);
app.use('/auth', auth);
app.use('/upload', upload);
app.use('/users', users);
app.use('/content-partners', cp);


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
