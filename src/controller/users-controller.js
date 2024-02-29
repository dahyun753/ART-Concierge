const userService = require("../services/users-service");

//회원정보 조회
async function getUser(req, res, next) {
  try {
    const user_Id  = req.user;
    const user = await userService.searchOne(user_Id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}

//회원정보 수정
async function putUser(req, res, next) {
  const { email, password, phone, userAddress } = req.body;

  try {
      const user_Id = req.user;
      await userService.putOneUser(
          user_Id,
          email,  // 올바른 email 값으로 수정
          password,
          phone,
          userAddress
      );

      res.json('수정완료');
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '회원 정보 수정 중 에러가 발생했습니다.' });
  }
}

//회원 탈퇴
async function deleteUser(req, res, next) {
  const user_Id = req.user;

  try {
    const removeUser = await userService.deleteOneUser(user_Id );
    res.json(removeUser);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { getUser, putUser, deleteUser };
