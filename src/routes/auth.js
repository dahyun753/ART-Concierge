const hashed = require('../utils/hash-password');
const { Router } = require('express');
const { User } = require('../db');
const passport = require('passport');
const { setUserToken } = require('../utils/jwt'); // JWT 사용

const router = Router();

// 로그인 -> passport 인증 함수 사용해서 유저 정보 세션에 저장 & 가져옴 
// router.post('/', passport.authenticate('local', {
//     successRedirect: '/',  // 로그인 성공 시 리다이렉트
//     failureRedirect: '/login',  // 로그인 실패 시 리다이렉트
// }), (req, res) => {
//     // Passport 인증이 성공하면 이 부분이 실행됨
//     console.log('로그인 성공!')
// });

//로그인 (JWT)
router.post('/', passport.authenticate('local', { session: false }), (req, res, next) => {
    // 유저 토큰 생성 및 쿠키 전달
    setUserToken(res, req.user);
    console.log('로그인 성공!')
    res.redirect('/'); // 쿠키를 전달 받아 토큰을 브라우져에 저장
    });

// 로그아웃 
router.get('/logout', (req, res, next) => {
    res.cookie('token', null, {
        maxAge: 0,
    })
    console.log('로그아웃 성공!')
    // req.logout();
    res.redirect('/');
    });


// 회원가입
router.post('/join', async (req, res) => {
    try {
        const { name, password, email, phone, address, isAdmin } = req.body;
        const hashedPassword = await hashed(password);
        const exist = await User.findOne({ email });

        if (exist) {
            throw new Error('이미 가입된 이메일입니다');
        }

        const newUser = await User.create({
            name,
            password: hashedPassword,
            email,
            phone,
            address,
            isAdmin
        });

        res.status(201).json({
            message: '회원가입 성공!',
            user: newUser
        });
    } catch (err) {
        res.status(500).json({
            message: '빈칸 없이 다 채우세요!',
            error: err.message
        });
    }
});

module.exports = router;
