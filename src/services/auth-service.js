const hashed = require("../utils/hash-password");
const { User, ValidPsw } = require("../db");
const nodemailerSend = require("../utils/send-mail");

//이메일 중복 체크 
async function checkEmail(email) {
    const user = await User.findOne({ email });
    console.log('User:', user);
    if (user) {
        throw ('이미 가입된 이메일입니다');
    }
    return;
}

// 이메일 발송
async function sendMail(email) {
    try {
        const verificationCode = await generateRandomPassword(); // 무작위 값 생성 

        await nodemailerSend(email, verificationCode);
        const user = await ValidPsw.findOne({ email });
        if (!user) {
            await ValidPsw.create({
                email,
                validPassword: verificationCode,
            });
        }
        else {
            await ValidPsw.updateOne({ email }, {
                validPassword: verificationCode,
            });
        }

        return { message: '비밀번호 변경을 위한 메일이 성공적으로 발송되었습니다!' }; // 발송된 코드와 발송 여부 리턴
    } catch (error) {
        throw new Error('이미 이메일로 인증키가 전송되었습니다.');
    }
}

// 토큰 일치 여부 확인 
async function checkcode(code, email) {
    try {
        const valid = await ValidPsw.findOne({ email });

        if (!valid.isTokenMatch || valid.isTokenMatch === 'undefined' || valid.isTokenMatch === 'null') {
            if (valid.validPassword !== code) {
                throw new Error ('인증 코드가 일치하지 않습니다');
            } else {
                // isTokenMatch를 1로 업데이트
                valid.isTokenMatch = 1;
                // 변경 사항 저장
                await valid.save();

                return valid.isTokenMatch;
            }
        }
    } catch (error) {
        // 여기서 에러를 처리합니다.
        console.error(error);
        throw error; // 에러를 상위 수준으로 전파하여 적절히 처리합니다.
    }
}


//회원 가입
async function addUser(userInfo) {
    const { name, password, email, phone, userAddress, detailAddress } = userInfo;
    const hashedPassword = await hashed(password);

    const newUser = await User.create({
        name,
        password: hashedPassword,
        email,
        phone,
        userAddress,
        detailAddress,
    });

    return newUser;
}

async function generateRandomPassword() {
    return Math.floor(Math.random() * 10 ** 8)
        .toString()
        .padStart(8, "0");
};


module.exports = { addUser, checkEmail, sendMail, checkcode };
