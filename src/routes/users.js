const { Router } = require("express");
const { User } = require("../db/index.js");
const shortId = require("../db/schemas/types/short-id");
const router = Router();

//회원정보 조회
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    const userList = users.map((user) => ({
      shortId: user.shortId,
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
  const { shortId, email, password, phone, userAddress } = req.body;
  try {
    const updatedUSer = await User.updateOne(
      { shortId: shortId },
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
  const { shortId } = req.body;

  try {
    const deleteUser = await User.deleteMany({ shortId: { $in: shortId } });
    res.json("ok");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
