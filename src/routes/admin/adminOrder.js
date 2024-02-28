const { Router } = require('express');
const adminOrderController = require('../../controller/adminOrderController');

const { Order } = require('../../db');

const router = Router();

// 배송 상태 변경
router.put('/:_id', adminOrderController.updateState);

// 관리자 주문 삭제(취소)
router.delete("/:_id", adminOrderController.deleteOrder);

module.exports = router;