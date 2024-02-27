const { Order } = require('../db');
const { deleteOrder } = require('./orderService');

const adminOrderService = {
    async updateState(_id, status) {
        const order = await Order.find({ _id });
        const deliveryStatus = order[0].deliveryStatus;
        console.log(deliveryStatus);

        const orderUpdate = await Order.updateOne(
            { _id },
            { deliveryStatus: status });

        return orderUpdate;
    },

    async deleteOrder(_id){
        try {
            const order = await Order.find({_id}).lean();
            const deliveryStatus = order[0].deliveryStatus;
            if (deliveryStatus == 1) {
                await Order.deleteOne({ _id});
                return 1;
            } else {
                console.log("이미 배송된 상품입니다.");
                return 2;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = adminOrderService;