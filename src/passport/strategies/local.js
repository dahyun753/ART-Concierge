const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../db");
const hashPassword = require("../../utils/hash-password");

const config = {
  usernameField: "email", //로그인에 email 사용
  passwordField: "password", //로그인에 password 사용
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("존재하지 않는 회원입니다."); //유저를 찾을 수 없을때
    }
    if (user.password !== hashPassword(password)) {
      throw new Error("비밀번호가 일치하지 않습니다."); //비밀전호가 일치하지 않을때
    }
    //완료 처리 콜백함수 done (에러, {유저정보})
    //정상 작동시 세션에 저장되는 유저 정보 최소화하여 기록
    done(null, {
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    done(err, null);
  }
});
module.exports = local;
