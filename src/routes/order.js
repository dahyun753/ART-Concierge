const { Router } = require("express");
const orderController = require("../controller/order-controller");
const { verifylogin } = require("../middlewares/loginRequired");

const router = Router();

router.post("/", verifylogin, orderController.postOrder); //주문추가, 주문하기
router.get("/", verifylogin, orderController.getOrder); //주문조회
router.put("/", verifylogin, orderController.updateOrder); //배송전 주문정보 수정
router.delete("/:orderId", verifylogin, orderController.deleteOrder); //유저 주문 취소 - 배송 전까지

module.exports = router;
