'use strict';

var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');

const MongoStore = require('connect-mongo')(session);
var app = express();
app.locals.moment = require('moment');
require('./lib/connectMongoose');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* var bodyParser = require('body-parser');            a
pp.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(express.json({limit: '50mb'})); */

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('./lib/i18n')();

// i18n config for internationalization
// Multilanguage setup
app.use(i18n.init);
app.locals.getLocales = i18n.getLocales();

const Article = require('./models/article');
app.locals.categories = Article.allowedCategories();

const sessionMware = session({
  name: "session-devrock",
  secret: 'thisisnotasecret',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
  store: new MongoStore({
    // conectar a la base de datos para guardar la session allí
    url: "mongodb://localhost:27017/welldone"
  })
});

// Use session
app.use(sessionMware);

io.use(function (socket, next) {
  sessionMware(socket.request, socket.request.res, next);
});

io.on('connection', function(socket){
  socket.emit('Hola', 'Holaaaa');
  socket.on('disconnect', () => console.log('User disconnected'))
});

app.use(flash());

// Helper middleware for get if user is auth
app.use(async (req, res, next) => {
  res.locals.isLogged = require('./lib/jwtAuth').isLogged(req);
  next();
});

// Import router
require('./routes/router')(app);

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
  //console.log(err);
  res.json('error');
});

module.exports = {
  app,
  server
};
