const adminOrderService = require('../services/admin-order-service');

const adminOrderController = {
    async getOrder(req, res, next) {
        try {
            const orderList = await adminOrderService.searchOrder();

            if(!orderList) {
                res.json('주문 목록이 비었습니다.');
            }
            res.json(orderList);
        } catch (err) {
            res.json(err);
        }
    },
    async updateState(req, res, next) {
        try {
            //배송전 주문정보 수정 -> 배송 상태 변경
            const _id = req.params._id; // orderId
            const { status } = req.body;
            console.log(status);
            // 배송 중
            const orderUpdate = await adminOrderService.updateState(_id, status);

            if (orderUpdate.modifiedCount === 1) {
                if (status === "2") {
                    res.send("주문 상태가 배송중으로 수정되었습니다.");
                } else if (status === "3") {
                    res.send("주문 상태가 배송완료로 수정되었습니다.");
                } else {
                    res.send("허용된 주문이 아닙니다");
                }
            } else {
                res.send("주문 수정에 실패했습니다.");
            }
        } catch (err) {
            res.json(err);
        }
    },

    async deleteOrder(req, res, next){
        try {
            const _id = req.params._id;
            const isDelivered = await adminOrderService.deleteOrder(_id);

            if (isDelivered == 1) {
                res.status(200).send("유저의 주문이 취소되었습니다");
            }else {
                res.send("배송 중인 상품입니다.")
            }
        } catch (err) {
            console.log("주문 삭제가 실패되었습니다.")
            res.json(err);
        }
    }
}

module.exports = adminOrderController;