const jwt = require('jsonwebtoken');
const secret = 'secret';
exports.secret = secret;

exports.setUserToken = (res, user) => {
    const token = jwt.sign(user, secret);   //(유저정보, 시크릿키) 유저 jwt 토큰생성
    res.cookie('token', token);   // 토큰을 토큰이라는 이름으로 쿠키에 전달
}