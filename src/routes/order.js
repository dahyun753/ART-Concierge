const { Router } = require('express');
const orderController = require('../controller/order-controller');
const { verifylogin } = require('../middlewares/loginRequired')

const router = Router();

//주문추가, 주문하기
router.post('/', verifylogin ,orderController.postOrder);

// 주문조회
router.get('/', verifylogin, orderController.getOrder);

//배송전 주문정보 수정
router.put('/', verifylogin,  orderController.updateOrder);

//유저 주문 취소 - 배송 전까지
router.delete('/', verifylogin, orderController.deleteOrder);


module.exports = router;