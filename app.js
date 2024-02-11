var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var editUserRouter = require('./routes/editUser');
var changePasswordRouter = require('./routes/changePassword');
var fileReportsRouter = require('./routes/fileReport');
var adminReportsRouter = require('./routes/adminReports');
var deleteReportsRoute = require('./routes/deleteReports');
var adminAllUsersRouter = require('./routes/adminAllUsers');
var contactUsRouter = require('./routes/contactUs');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/editUser', editUserRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/fileReport', fileReportsRouter);
app.use('/admin-reports', adminReportsRouter);
app.use('/deleteReport', deleteReportsRoute);
app.use('/admin-users', adminAllUsersRouter);
app.use('/contactUs', contactUsRouter);
// app.use('/users', usersRouter);

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

app.listen(3000, () => {
  console.log("server is running");
});

module.exports = app;
