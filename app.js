'use strict';

var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();
app.locals.moment = require('moment');
require('./lib/connectMongoose');
var articleRouter = require('./routes/article')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('./lib/i18n')();

// i18n config for internationalization
// Multilanguage setup
app.use(i18n.init);
app.locals.getLocales = i18n.getLocales();

// Use session
app.use(session({
  name: "session-devrock",
  secret: 'thisisnotasecret',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
  store: new MongoStore({
    // conectar a la base de datos para guardar la session allí
    url: "mongodb://localhost:27017/welldone"
  })
}));

// Helper middleware for get if user is auth
app.use(async (req, res, next) => {
  res.locals.isLogged = require('./lib/jwtAuth').isLogged(req);
  next();
});

// Import router
require('./routes/router')(app);
app.use('/articles', articleRouter);

app.use(express.static(path.join(__dirname, 'admin/build')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json('error');
});

module.exports = app;
