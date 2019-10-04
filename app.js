const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
//var localStrategy = require('passport-local').strategy;
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {useNewUrlParser: true});
let db = mongoose.connection;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(expressValidator());

app.use(session({
  secret:'keyboard cat',
  saveUninitialized : false,
  resave: false
}));

app.use(flash());
/*
app.use(function(req, res, next){
  res.locals.messages = req.flash('success_messages');
  res.locals.messages = req.flash('error_messages');
  next();
});
  */
// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

app.locals.moment = require('moment');

/*app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
*/
app.get('*',(req,res,next) =>{
  res.locals.user = req.user || null;
  next();
});


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
  res.render('error');
});

module.exports = app;
