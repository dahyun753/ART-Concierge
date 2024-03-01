const authService = require("../services/auth-service");
const ERRORS = require("../utils/errors");
const state = 0;
const mailCode = '';

// 이메일 중복 체크
async function uniqueEmail(req, res, next) {
  try {
    const email = req.body.email;
    await authService.checkEmail(email);

    res.status(200).json({ message: "사용 가능한 이메일입니다" });
  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.INVALID_INPUT;
    res.status(statusCode).json({ message });
  }
}

async function sendMail(req, res, next) {
  try {
    const email = req.body.email;
    const result = await authService.sendMail(email);
    mailCode = result.code;

  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.INVALID_INPUT;
    res.status(statusCode).json({ message });
  }
}

async function checkMailCode(req, res, next) {
  try {

    const input = req.body.code;
    await authService.checkcode(input, result.code, state);
    
    state = 1;
    res.status(200).json({ message: "인증 되었습니다" });
  } catch (err) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.INVALID_INPUT;
    res.status(statusCode).json({ message });
  }
}

// 회원 가입
async function postUser(req, res, next) {
  try {
    const userInfo = req.body;

    await authService.checkEmail(userInfo.email);  // 이메일 중복체크
    if ( state == 1 ) { // 이메일 인증 상태가 1일때 
      const newUser = await authService.addUser(userInfo); 
      res.status(201).json(newUser);
    }
    state = 0;

  } catch (err) {
    const { statusCode, message } = err.statusCode
      ? err
      : ERRORS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message });
  }
}

// 비밀번호 찾기
async function findPassword(req, res, next) {
  try {
    const { email } = req.body;

    await authService.sendMail(email);

    res.status(204).json();
  } catch (err) {
    const { statusCode, message } = err.statusCode
      ? err
      : ERRORS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message });
  }
}

module.exports = { postUser, uniqueEmail, findPassword, sendMail,  checkMailCode };
