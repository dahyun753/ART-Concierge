const jwt = require('jsonwebtoken');

// 로그인 여부 확인 미들웨어
exports.isLogined = (req, res, next) => {
    const userToken = req.headers.cookie.split("=")[1];

    if (!userToken || userToken === "null") {
        console.log(`서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: ${userToken}`);
        return res.json({
            result: "forbidden-approach",
            reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });
    }
    next();
};


// 토큰 검증 미들웨어
exports.verifyToken = (req, res, next) => {
    const userToken = req.headers.cookie.split("=")[1];

    try {
        const jwtDecoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
        console.log(jwtDecoded);
        const user_Id = jwtDecoded._Id;

        next();
    } catch (error) {
        return res.json({
            result: "forbidden-approach",
            reason: "정상적인 토큰이 아닙니다.",
        });
    }
};
