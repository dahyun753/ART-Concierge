const orderService = require("../services/orderService");

const orderController = {
    async postOrder(req, res, next) {
        try {
            const {
                item: [{ exhibitId, exhibitName, quantity, price, image }],
                userAddress,
                phone,
                name
            } = req.body;
            const orderedDate = new Date(); // 주문일을 현재 날짜로 설정
            // 여기에서 주문을 생성하고 데이터베이스에 저장
            const newOrder = await orderService.createOrder({
                name,
                phone,
                userAddress,
                item: [{ exhibitId, exhibitName, quantity, price, image }],
                orderedDate
            });
            console.log(req.body);
            res.json({
                _id: newOrder._id,
                name: newOrder.name
            });
        } catch (err) {
            res.json(err);
        }
    },

    async getOrder(req, res, next) {
        //사용자의 주문내역
        try {
            const _id = req.params._id;
            const orderList = await orderService.getOrder(_id);
            res.json(orderList);
        } catch (err) {
            res.json(err);
        }
    },

    async updateOrder(req, res, next) {
        try {
            //배송전 주문정보 수정
            const _id = req.params._id;
            const { userAddress, phone, name } = req.body;
            const order = await orderService.updateOrder(_id, userAddress, phone, name);

            if (order === 1) {
                res.send("유저 주문 정보가 수정되었습니다.");
            } else {
                res.send("이미 배송중인 상품입니다.");
            }
        } catch (err) {
            res.json(err);
        }
    },

    async deleteOrder(req, res, next) {
        try {
            const _id = req.params._id;
            const isDelivered = await orderService.deleteOrder(_id);

            if (isDelivered == 1) {
                res.status(200).send("유저의 주문이 취소되었습니다");
            }
        } catch (err) {
            res.json(err);
        }
    },
};

module.exports = orderController;