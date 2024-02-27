const { Router } = require('express');
const orderController = require('../controller/orderController');

const router = Router();

//주문추가, 주문하기
router.post('/', orderController.postOrder);

// 주문조회
router.get('/', orderController.getOrder);

//배송전 주문정보 수정
router.put('/:_id', orderController.updateOrder);

//유저 주문 취소 - 배송 전까지
router.delete('/:_id', orderController.deleteOrder);


module.exports = router;