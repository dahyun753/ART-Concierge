const { User } = require("../db/index.js");

//회원정보 조회
async function getOneUSer() {
  const users = await User.find({});
  const userList = users.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    userAddress: user.userAddress,
    phone: user.phone,
  }));
  return userList;
}

//회원정보 수정
async function putOneUser(_id, email, password, phone, userAddress) {
  const updatedUser = await User.updateOne(
    { _id: _id },
    {
      $set: {
        email: email,
        password: password,
        phone: phone,
        userAddress: userAddress,
      },
    }
  );
  return updatedUser;
}

//회원 탈퇴
async function deleteOneUser(_id) {
  const deleteUser = await User.deleteMany({ _id: { $in: _id } });
  return deleteUser;
}
module.exports = { getOneUSer, putOneUser, deleteOneUser };
