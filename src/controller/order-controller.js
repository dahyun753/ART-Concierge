const orderService = require("../services/order-service");

const orderController = {
    async postOrder(req, res, next) {
        try {
            const {
                item: [{ exhibitId, exhibitName, quantity, price, image }],
                userAddress,
                phone,
                name
            } = req.body;

            const user_Id  = req.user;
            

            const orderedDate = new Date(); // 주문일을 현재 날짜로 설정
            // 여기에서 주문을 생성하고 데이터베이스에 저장
            const newOrder = await orderService.createOrder({
                userId: user_Id,
                name,
                phone,
                userAddress,
                item: [{ exhibitId, exhibitName, quantity, price, image }],
                orderedDate
            });
            console.log(newOrder);
            res.json({
                userId: newOrder.userId,
                name: newOrder.name
            });
        } catch (err) {
            res.json(err);
        }
    },

    async getOrder(req, res, next) {
        //사용자의 주문내역
        try {
            const user_Id  = req.user;
            const orderList = await orderService.getOrder(user_Id);
            res.json(orderList);
        } catch (err) {
            res.json(err);
        }
    },

    async updateOrder(req, res, next) {
        try {
            //배송전 주문정보 수정
            const user_Id  = req.user;
            const { userAddress, phone, name } = req.body;
            const order = await orderService.updateOrder(user_Id, userAddress, phone, name);

            if (order === '배송전') {
                res.json("유저 주문 정보가 수정되었습니다.");
            } else {
                res.json("이미 배송중인 상품입니다.");
            }
        } catch (err) {
            res.json(err);
        }
    },

    async deleteOrder(req, res, next) {
        try {
            const user_Id  = req.user;
            const isDelivered = await orderService.deleteOrder(user_Id);

            if (isDelivered == 1) {
                res.status(200).send("유저의 주문이 취소되었습니다");
            }
        } catch (err) {
            res.json(err);
        }
    },
};

module.exports = orderController;