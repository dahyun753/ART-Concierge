const { orderService } = require("../services");

const orderController = {
    async postOrder(req, res, next) {
        
    },

    async getOrder(req, res, next) {
        //사용자의 주문내역
        const userId = req.user.shortId;
        try {
            //db에서 받아온 값이 넘어옴
            const orderList = await orderService.getOrder(userId);
            if (orderList.length < 1) {
                res.send({
                    message: "해당 유저의 주문내역이 존재하지 않습니다.",
                    orderList: [],
                });
            }
            res.status(200)
                .send({ message: "유저 주문내역 조회 성공", orderList: orderList });
        } catch (err) {
            res.send(500).send({ message: "유저 주문내역 조회 실패" });
            next(err);
        }
    },

    async deleteOrder(req, res, next) {
        const orderId = req.params.orderId;
        try {
            const isCanceled = await orderService.deleteOrder(orderId);
            if (isCanceled === 1) {
                res.status(200).send("유저의 주문이 취소되었습니다");
            } else {
                res.status(404).send("이미 배송중인 상품입니다.");
            }
        } catch (err) {
            console.log("유저주문 취소 에러 발생" + err);
            res.send(500).send("유저 주문 취소 실패");
            next(err);
        }
    },

    async updateOrder(req, res, next) {
        //배송전 주문정보 수정
        const orderId = req.params.orderId;
        const { userAddress, phone } = req.body;
        try {
            const isDelivered = await orderService.updateOrder(orderId, userAddress, phone);
            if (isDelivered === 1) {
                res.status(200).send("유저 주문 정보가 수정되었습니다.");
            } else {
                res.status(404).send("이미 배송중인 상품입니다.");
            }
        } catch (err) {
            console.log("유저의 주문 정보 수정에 실패했습니다.");
            res.send(500).send("유저 주문정보 수정 실패");
            next(err);
        }
    },
};

module.exports = orderController;