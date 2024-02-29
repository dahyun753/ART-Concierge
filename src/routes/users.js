const express = require("express");
const router = express.Router();
const usersController = require("../controller/users-controller");
const { verifylogin } = require('../middlewares/loginRequired')

router.get("/", verifylogin, usersController.getUser);
router.put("/", verifylogin, usersController.putUser);
router.delete("/", verifylogin, usersController.deleteUser);

module.exports = router;
