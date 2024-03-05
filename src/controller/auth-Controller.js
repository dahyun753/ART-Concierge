const { ValidPsw } = require("../db");
const authService = require("../services/auth-service");
let state = 0;

// 이메일 중복 체크
async function uniqueEmail(req, res, next) {  // 중복 확인 버튼으로 실행
  try {
    console.log(req)
    const email = req.body.email;
    console.log(email)
    await authService.checkEmail(email);
    res.status(200).json({ message: "사용 가능한 이메일입니다" });
  } catch (err) {

    res.status(409).json({ error: err.message });
  }
}
// 메일 발송 (노드 메일러 호출)
async function sendMail(req, res, next) { // 인증번호 발급 버튼
  try {
    const email = req.body.email;
    const result = await authService.sendMail(email);

    res.json('인증코드가 발급되었습니다!');
  } catch (err) {
    res.json(err);
  }
}

// 오류가 캐치에서 안 걸리면 서버가 죽어버림 그러니까 이런 경우도 대비해서

async function checkMailCode(req, res, next) { // 인증번호 확인 버튼 (메일로 보낸 인증번호 입력)
  try {
    const {code, email} = req.body;
    await authService.checkcode(code, email);
    res.json({ message: "인증 되었습니다" });
  } catch (err) {
    res.json({error :err.message})
  }
}

// 회원 가입
async function postUser(req, res, next) {
  try {
    const userInfo = req.body;

    const user = await ValidPsw.findOne({email: userInfo.email});
    if (user.isTokenMatch === 1) {
      const newUser =  await authService.addUser(userInfo);
      res.status(201).json(newUser); 
    }
    else {
      res.json('이메일 인증정보를 확인해주세요.')
    }
  } catch (err) {
    res.json(err)
  }
}

module.exports = { postUser, uniqueEmail,  sendMail,  checkMailCode };
