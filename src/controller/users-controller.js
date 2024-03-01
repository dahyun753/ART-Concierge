const userService = require("../services/users-service");
const ERRORS = require("../utils/errors");

//회원정보 조회
async function getUser(req, res, next) {
  try {
    const user_Id = req.user;
    const user = await userService.searchOne(user_Id);
    res.json(user);
  } catch (error) {
    const { statusCode, message } = err.statusCode ? err : ERRORS.INVALID_INPUT;
    res.status(statusCode).json({ message });
  }
}

//회원정보 수정
async function putUser(req, res, next) {
  const { email, password, phone, userAddress, detailAddress } = req.body;

  try {
    const user_Id = req.user;
    await userService.putOneUser(
      user_Id,
      email, // 올바른 email 값으로 수정
      password,
      phone,
      userAddress,
      detailAddress
    );

    res.json("수정완료");
  } catch (error) {
    console.error(error);
    const { statusCode, message } = err.statusCode ? err : ERRORS.INVALID_INPUT;
    res.status(statusCode).json({ message });
  }
}

//회원 탈퇴
async function deleteUser(req, res, next) {
  const user_Id = req.user;

  try {
    const removeUser = await userService.deleteOneUser(user_Id);
    res.json(removeUser);
  } catch (error) {
    const { statusCode, message } = err.statusCode
      ? err
      : ERRORS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ message });
    s;
  }
}

module.exports = { getUser, putUser, deleteUser };
