const { Order } = require('../db');
const { User } = require("../db");

const orderService = {
    //주문 추가, 주문하기
    async addOrder({ userId, image, phone, userAddress, item, totalPrice, exhibitId }) {
        const user = await User.findOne({ shortId: userId }).lean();
        console.log("유저 아이디" + user._id);
        const addOrder = await Order.create({
            userId,
            // populate 위해 필요
            customerId: user._id,
            image,
            phone,
            userAddress,
            item,
            totalPrice,
            exhibitId,
        });
        return addOrder;
    },

    // 사용자의 주문 조회
    async getOrder(userId) {
        try {
            const userOrder = await Order.find({ userId })
                .sort({ orderedDate: -1 })
                .exec();
            return userOrder;
        } catch (err) {
            console.log(err);
        }
    },

    //사용자의 주문 수정 (주문 전 주문 취소)
    async deleteOrder(orderId) {
        try {
            const order = await Order.find({ orderId }).populate("customerId").lean();
            const deliveryStatus = order[0].deliveryStatus;
            if (deliveryStatus == 1) {
                await Order.deleteOne({ orderId });
                console.log("유저 주문이 취소되었습니다.");
                return 1;
            } else {
                console.log("이미 배송된 상품입니다.");
                return 2;
            }
        } catch (error) {
            console.log(error);
        }
    },

    // 주문 수정
    async updateOrder(putTargetOrderId, putTargetUserAddress, putTargetPhone) {
        try{
            const order = await Order.find({ orderId: putTargetOrderId })
                .lean()
                .populate("customerId")
                .exec();
            console.log(order);
            const deliveryStatus = order[0].deliveryStatus;
            if(deliveryStatus == 1){
                await Order.updateMany(
                    { orderId: putTargetOrderId },
                    {
                        userAddress: putTargetUserAddress,
                        phone: putTargetPhone,
                    }
                ).lean();
                console.log("유저의 주문정보가 수정되었습니다");
                return 1;
            } else{
                return 2;
            }
        } catch(err) {
            console.log("유저의 주문정보 수정에 실패했습니다." + err);
        }
    },
};

module.exports = orderService;