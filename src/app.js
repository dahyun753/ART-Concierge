const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminExhibitsRouter = require('./routes/admin/exhibit'); // 관리자 페이지 for 전시 관리 
const adminCategoriesRouter = require('./routes/admin/category'); // 관리자 페이지 for 전시 관리 
const authRouter = require('./routes/auth'); // 로그인/ 회원가입
const adminRouter = require('./routes/admin');
var cartsRouter = require("./routes/carts");
var userMypageRouter = require("./routes/userMypage");

const orderRouter = require('./routes/orderRouter'); // 주문

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 배열을 다룰 수 있는 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/exhibits', adminExhibitsRouter ); //관리자 라우터 (전시)
app.use('/admin/categories', adminCategoriesRouter); //관리자 라우터 (카테고리)
app.use('/auth', authRouter); // 로그인 + 회원가입 
app.use("/carts", cartsRouter);
app.use("/user-mypage", userMypageRouter);

app.use('/orders', orderRouter);  // 주문 라우터
/* 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); // error.pug 파일이 존재해야 합니다.
});
 */

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


// 몽구스 연결
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
