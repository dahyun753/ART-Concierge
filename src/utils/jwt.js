const jwt = require('jsonwebtoken');
const secret = 'secret';
exports.secret = secret;

exports.setUserToken = (res, user) => {
    const tokenExpiration = 2 * 60; // 2분을 초 단위로 계산
    const token = jwt.sign(user, secret, { expiresIn: tokenExpiration });
    
    res.cookie('token', token); // 토큰을 쿠키에 전달
};
