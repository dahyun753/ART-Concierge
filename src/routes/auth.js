const hashed = require('../utils/hash-password');
const { Router } = require('express');
const { User } = require('../db');

const router = Router();

// 회원가입
router.post('/join', async (req, res, next) => {
    try {
        const { name, password, email, phone, address, isAdmin } = req.body;
        const hashedPassword = await hashed(password);
        const exist = await User.findOne({
            email
        });

        if (exist) {
            throw new Error ('이미 가입된 이메일입니다')
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
