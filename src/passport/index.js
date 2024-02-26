const passport = require('passport');
const local = require('./strategies/local')
const jwt = require('./strategies/jwt')

module.exports = () => {
  passport.use(local);
  
  // jwt strategy 사용
  passport.use(jwt);
  
};

//module.exports = () => {
    //passport.use(local);
    
    //JWT 사용으로 인한 비활성화
    // // 사용자의 어떤 정보 세션 저장할지 결정, 콜백은 에러 처리를 위함
    // passport.serializeUser((user, callback) => {
    // callback(null, user); // (에러, 식별자값_user.id)
    // });

    // // 사용자의 식별자 기반의 객체 복원
    // passport.deserializeUser((obj, callback) => {
    // callback(null, obj); // (에러, 요청 객체_ req,user)
    // });

//};