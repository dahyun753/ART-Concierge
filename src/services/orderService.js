const { Order } = require('../db');

const orderService = {
    //주문 추가, 주문하기
    async createOrder({
        name,
        phone,
        userAddress,
        item: [{ exhibitId, exhibitName, quantity, price, image }],
        orderedDate }) {
        const createOrder = await Order.create({
            name,
            phone,
            userAddress,
            item: [{ exhibitId, exhibitName, quantity, price, image }],
            orderedDate
        });
        return createOrder;
    },

    // 사용자의 주문 조회
    async getOrder(_id) {
        try {
            const orders = await Order.find({ _id: _id }).lean().exec();
            const orderList = orders.map((order) => ({
                _id: order._id,
                item: order.item,
                userName: order.name,
                deliveryStatus: order.deliveryStatus
            }));
            return orderList;
        } catch (err) {
            console.log(err);
        }
    },

    // 주문 수정
    async updateOrder(_id, userAddress, phone, name) {
        try {
            const order = await Order.find({ _id }).lean().exec();
            console.log(order);
            const deliveryStatus = order[0].deliveryStatus;
            if (deliveryStatus == 1) {
                await Order.updateMany(
                    { _id: _id },
                    { userAddress, phone, name }).lean();
                console.log(name + "유저의 주문정보가 수정되었습니다");
                return 1;
            } else {
                return 2;
            }
        } catch (err) {
            console.log("유저의 주문정보 수정에 실패했습니다." + err);
        }
    },

    //사용자의 주문 수정 (주문 전 주문 취소)
    async deleteOrder(_id) {
        try {
            const order = await Order.find({_id}).lean();
            const deliveryStatus = order[0].deliveryStatus;
            if (deliveryStatus == 1) {
                await Order.deleteOne({ _id});
                console.log("유저 주문이 취소되었습니다.");
                return 1;
            } else {
                console.log("이미 배송된 상품입니다.");
                return 2;
            }
        } catch (err) {
            console.log(err);
        }
    },
};

module.exports = orderService;