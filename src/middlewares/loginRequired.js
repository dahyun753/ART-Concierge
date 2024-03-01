const jwt = require("jsonwebtoken");

//토큰 검증 및 로그인 여부 확인 미들웨어
exports.verifylogin = (req, res, next) => {
  const userToken = req.headers.cookie
    ? req.headers.cookie.split("=")[1]
    : "null";

  if (!userToken || userToken === "null") {
    console.log(
      `서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: ${userToken}`
    );
    return res.json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });
  }

  try {
    jwt.verify(userToken, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.error("JWT 검증 오류:", err.message);
        return res.json({
          result: "forbidden-approach",
          reason: "토큰 검증에 실패했습니다.",
        });
      }

      console.log(decoded);

      const user_Id = decoded._id;
      console.log(user_Id);

      req.user = user_Id;
      next();
    });
  } catch (error) {
    return res.json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
      message: error.message,
    });
  }
};
