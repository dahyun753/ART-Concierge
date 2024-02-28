const userService = require("../services/users-service");

//회원정보 조회
async function getUser(req, res, next) {
  try {
    const user = await userService.getOneUSer();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}

//회원정보 수정
async function putUser(req, res, next) {
  const { _id, email, password, phone, userAddress } = req.body;

  try {
    const modifyUser = await cartService.putOneUser(
      _id,
      email,
      password,
      phone,
      userAddress
    );

    res.json(modifyUser);
  } catch (error) {
    res.json(error);
  }
}

//회원 탈퇴
async function deleteUser(req, res, next) {
  const { _id } = req.body;

  try {
    const removeUser = await cartService.deleteOneUser(_id);
    res.json(removeUser);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { getUser, putUser, deleteUser };
