const nodemailer = require("nodemailer");

// nodemailer  gmail transport 생성하기
const transport = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.MAILER_AUTH,
    pass: process.env.MAILER_PASS,
  },
});

module.exports = (to, newPassword) =>
  new Promise((resolve, reject) => {
    const message = {
      from: process.env.GMAIL_ID, //관리자 Email
      to, //비밀번호 초기화 요청 유저 Email
      subject: "ART CONCIERGE 🎫 비밀번호 초기화 메일", // 메일의 제목
      html: ` 초기화된 비밀번호는 다음과 같습니다.${newPassword}`,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
