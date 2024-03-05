const userService = require("../services/users-service");

//회원정보 조회
async function getUser(req, res, next) {
  try {
    const user_Id = req.user;
    const user = await userService.searchOne(user_Id);
    res.json(user);
  } catch (error) {
<<<<<<< Updated upstream
    res.json(err)
=======
    res.json(error)
>>>>>>> Stashed changes
  }
}

//회원정보 수정
async function putUser(req, res, next) {
  try {
    const user_Id = req.user;
    const {name, password, phone, userAddress, detailAddress } = req.body;
    await userService.putOneUser({
      name, 
      password, 
      phone, 
      userAddress, 
      detailAddress },
      user_Id
    );

    res.json("수정완료");
  } catch (error) {
    res.json(err)
  }
}

//회원 탈퇴
async function deleteUser(req, res, next) {
  const user_Id = req.user;

  try {
    const removeUser = await userService.deleteOneUser(user_Id);
    res.json('탈퇴 완료');
  } catch (error) {
    res.json(err)
  }
}

module.exports = { getUser, putUser, deleteUser };
