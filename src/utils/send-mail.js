const nodemailer = require("nodemailer");

// nodemailer  gmail transport 생성하기
const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.MALER_AUTH,
    pass: process.env.MAILER_PASS,
  },
});

module.exports = (to, newPassword) =>
  new Promise((resolve, reject) => {
    const message = {
        from: process.env.GMAIL_ID,	//관리자dml Email
        to,	//비밀번호 초기화 요청 유저 Email
        subject: 'ART CONCIERGE 🎫 비밀번호 초기화 메일',	// 메일의 제목
        html: `당신이 원하는 전시 여기 다 있다! 나만 몰랐던 요즘 전시관을 배달 받아보세요 📦 ART CONCEIERGE! 인증번호는 다음과 같습니다.${newPassword}`}

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
