const express = require("express");
const router = express.Router();
const cartController = require("../controller/carts-controller");

router.post("/", cartController.postCart);
router.get("/", cartController.getCart);
router.put("/", cartController.putCart);
router.delete("/", cartController.deleteCart);

module.exports = router;
