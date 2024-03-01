var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const viewsRouter = require("./routes/view-Router");

const adminRouter = require("./routes/admin"); // 관리자 페이지 (전시, 카테고리, 주문)
const authRouter = require("./routes/auth"); // 로그인 + 회원가입
const usersRouter = require("./routes/users"); // 유저
const exhibitRouter = require("./routes/exhibits"); // 전시 (상품)
const orderRouter = require("./routes/order"); // 주문
const { adminValidate } = require("./middlewares/adminValidator"); // 미들웨어
const { verifylogin } = require("./middlewares/loginRequired"); //미들웨어

require("./passport")();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// html css js 로드
app.use(viewsRouter);

app.use(passport.initialize()); //passport 초기화
// app.use(passport.session()); //passport 세션 사용

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 배열을 다룰 수 있게 해줌
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/admin", verifylogin, adminValidate, adminRouter); // 관리자 페이지 (전시, 카테고리, 주문)
app.use("/api/auth", authRouter); // 로그인 + 회원가입
app.use("/api/users", usersRouter); // 유저
app.use("/api/exhibits", exhibitRouter); // 전시 (상품)
app.use("/api/orders", orderRouter); // 주문

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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
