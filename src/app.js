var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const viewsRouter = require("./routes/view-Router");

const authRouter = require('./routes/auth'); // 로그인/ 회원가입
var cartsRouter = require("./routes/carts");
var usersRouter = require("./routes/users");
const exhibitRouter = require('./routes/exhibits')
const adminOrderRouter = require('./routes/admin/admin-order');  // 관리자 페이지 for 주문

const orderRouter = require('./routes/order'); // 주문

const getUserFromJWT = require("./middlewares/get-user-from-jwt");

require("./passport")();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//로그인을 위한 세션 사용 -> JWT 사용으로 인해 주석처리
// app.use(session({
//   secret: 'secret',  //세션 식별자 서명
//   resave: false,  //세션 데이터가 변경되지 않았더라도 계속 저장
//   saveUninitialized: true  //초기화되지 않은 세션을 저장소에 저장할지 여부 (모든 세션 저장)
// }));

// html css js 로드
app.use(viewsRouter);

app.use(passport.initialize()); //passport 초기화
// app.use(passport.session()); //passport 세션 사용

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 배열을 다룰 수 있는
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(getUserFromJWT); // 로그인을 위한 미들웨어

app.use("/", indexRouter);
app.use("/api/admin", adminRouter); //관리자 라우터 (전시 + 카테고리)
app.use("/api/auth", authRouter); // 로그인 + 회원가입
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/exhibits", exhibitRouter); // 전시보기
app.use("/api/orders", orderRouter); // 주문 라우터
app.use("/api/admin/orders", adminOrderRouter); //관리자 라우터 (주문)

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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 몽구스 연결
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
