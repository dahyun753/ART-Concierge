const express = require("express");
const router = express.Router();
const usersController = require("../controller/users-controller");

router.get("/", usersController.getUser);
router.put("/", usersController.putUser);
router.delete("/", usersController.deleteUser);

module.exports = router;
