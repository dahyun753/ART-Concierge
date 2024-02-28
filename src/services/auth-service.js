const hashed = require('../utils/hash-password');
const { User } = require('../db');
const nodemailerSend = require('../utils/send-mail');

// 이메일 중복 체크
async function checkEmail(email) {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error('이미 가입된 이메일입니다');
    }
    return ;
}

// 회원 가입 
async function addUser(userInfo) {
    const { name, password, email, phone, userAddress, detailAddress } = userInfo;
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
}

async function sendMail(email) {
    try {
        const newPassword = await generateRandomPassword(); // 무작위 값 생성

        await User.findOneAndUpdate({email}, {
            password: hashed(newPassword),
        });

        await nodemailerSend(email, newPassword);

        return { message: '비밀번호 변경을 위한 메일이 성공적으로 발송되었습니다!' };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function generateRandomPassword () {
    return Math.floor(Math.random() * 10 ** 8)
        .toString()
        .padStart(8, "0");
};

// 로그인 
// async function loginUser(req, res, next) {
//     return new Promise((resolve, reject) => {
//         passport.authenticate('local', { session: false }, (err, user, info) => {
//             if (err) {
//                 return reject(err);
//             }

//             if (!user) {
//                 let errorMessage = '인증 실패';
                
//                 // Passport local strategy에서 전달받은 info 객체를 통해 오류 메시지 확인
//                 if (info && info.message === 'Missing credentials') {
//                     errorMessage = '아이디가 틀렸습니다';
//                 } else if (info && info.message === 'Invalid password') {
//                     errorMessage = '비밀번호가 틀렸습니다';
//                 }
//                 console.log(errorMessage)
//                 return reject({ message: errorMessage, status: 401 });
//             }

//             setUserToken(res, user);
//             console.log('로그인 성공!');
//             resolve(user);
//         })(req, res, next);
//     });
// }



module.exports = { addUser, checkEmail, sendMail};