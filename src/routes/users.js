const express = require("express");
const router = express.Router();
const usersController = require("../controller/users-controller");
const { verifylogin } = require("../middlewares/loginRequired");

router.get("/", verifylogin, usersController.getUser); //회원정보 조회
router.put("/", verifylogin, usersController.putUser); //회원정보 수정
router.delete("/", verifylogin, usersController.deleteUser); //회원 탈퇴

module.exports = router;
