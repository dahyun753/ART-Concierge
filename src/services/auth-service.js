const hashed = require('../utils/hash-password');
const passport = require('passport');

const { User } = require('../db');
const { setUserToken } = require('../utils/jwt'); // JWT 사용

async function checkEmail (email) {
    const exist = await User.findOne({ email });

    if (exist) {
        throw new Error('이미 가입된 이메일입니다');
    }
    return;
}

async function addUser (userInfo){
    const { name, password, email, phone, userAddress, detailAddress } = userInfo;
    const exist = await User.findOne({ email });

    const hashedPassword = await hashed(password);

    const newUser = await User.create({
        name,
        password: hashedPassword,
        email,
        phone,
        userAddress, 
        detailAddress
    });

    return newUser;
};

module.exports = {addUser, };