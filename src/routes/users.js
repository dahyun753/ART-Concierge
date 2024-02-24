const { Router } = require("express");
const { User } = require("../db/index.js");
const router = Router();

//회원정보 조회
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    const userList = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      userAddress: user.userAddress,
      phone: user.phone,
    }));
    res.json(userList);
  } catch (error) {
    res.json(error);
  }
});

//회원정보 수정
router.put("/", async (req, res, next) => {
  const { _id, email, password, phone, userAddress } = req.body;
  try {
    const updatedUSer = await User.updateOne(
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
    res.json(updatedUSer);
  } catch (error) {
    res.json(error);
  }
});

//회원 탈퇴
router.delete("/", async (req, res, next) => {
  const { _id } = req.body;

  try {
    const deleteUser = await User.deleteMany({ _id: { $in: _id } });
    res.json("ok");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
