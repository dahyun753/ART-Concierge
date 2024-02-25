var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminExhibitsRouter = require('./routes/admin/exhibit'); // 관리자 페이지 for 전시 관리 
const adminCategoriesRouter = require('./routes/admin/category'); // 관리자 페이지 for 전시 관리 
const authRouter = require('./routes/auth'); // 로그인/ 회원가입

const getUserFromJWT= require('./middlewares/get-user-from-jwt')

require('./passport')();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//로그인을 위한 세션 사용 -> JWT 사용으로 인해 주석처리
// app.use(session({ 
//   secret: 'secret',  //세션 식별자 서명
//   resave: false,  //세션 데이터가 변경되지 않았더라도 계속 저장 
//   saveUninitialized: true  //초기화되지 않은 세션을 저장소에 저장할지 여부 (모든 세션 저장)
// }));
app.use(passport.initialize());  //passport 초기화
// app.use(passport.session()); //passport 세션 사용

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 배열을 다룰 수 있는 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(getUserFromJWT); // 로그인을 위한 미들웨어

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/exhibits', adminExhibitsRouter ); //관리자 라우터 (전시)
app.use('/admin/categories', adminCategoriesRouter); //관리자 라우터 (카테고리)
app.use('/auth', authRouter); // 로그인 + 회원가입 

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
