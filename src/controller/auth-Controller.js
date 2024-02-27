const authService = require('../services/auth-service');

// 이메일 중복 체크
async function uniqueEmail(req, res, next) {
    try {
        const email = req.body.email;

        await authService.checkEmail(email);;

        res.status(200).json({ message: '사용 가능한 이메일입니다' });
    } catch (err) {
        res.status(400).json({message: '이미 사용 중인 이메일입니다'});
    }
}

// 회원 가입 
async function postUser(req, res, next) {
    try {
        const userInfo = req.body;

        // 이메일 중복체크 
        await authService.checkEmail(userInfo.email);
        const newUser = await authService.addUser(userInfo);

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// 로그인
// async function loginUser(req, res, next) {
//     try {
//         const { email, password } = req.body;

//         const user = await authService.loginUser(email, password);
//         res.status(204).send();
//     } catch (error) {
//         // 서비스 레이어에서 전달된 오류 메시지를 클라이언트에게 전송
//         res.status(401).json({ error: error.message });
//     }
// }


module.exports = { postUser, uniqueEmail };