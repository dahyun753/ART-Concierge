const jwt = require('jsonwebtoken');

const loginRequired = (req, res, next) => {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["Authorization"]?.split(" ")[1];

    // 이 토큰은 jwt 토큰 문자열 || "null" 문자열 || undefined
    // 토큰이 "null" 일 경우, loginRequired 가 필요한 서비스 사용을 제한
    if (!userToken || userToken === "null") {
        console.log(`서비스 사용 요청이 있습니다.하지만, Authorization 토큰: ${userToken}`);
        res.json({
            result: "forbidden-approach",
            reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });
        return;
    }

    // 해당 token 이 정상적인 token인지 확인
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        const userId = jwtDecoded.userId;

        // JWT 토큰을 쿠키에 저장
        const maxAge = 60 * 60 * 24 * 7; // 1주일
        res.cookie('jwt', userToken, { maxAge: maxAge * 1000, httpOnly: true });

        // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
        req.currentUserId = userId;

        next();
    } catch (error) {
        // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
        // 403 코드로 JSON 형태로 프론트에 전달함.
        res.json({
            result: "forbidden-approach",
            reason: "정상적인 토큰이 아닙니다.",
        });
        return;
    }
}

module.exports = loginRequired;