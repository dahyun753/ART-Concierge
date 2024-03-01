const { Order } = require("../db");
const { deleteOrder } = require("./order-service");

const adminOrderService = {
  //주문 조회
  async searchOrder() {
    const orderList = await Order.find({});

    return orderList;
  },

  //주문 수정
  async updateState(orderId, status) {
    const order = await Order.find({ _id: orderId });
    const deliveryStatus = order[0].deliveryStatus;
    console.log(deliveryStatus);

    const orderUpdate = await Order.updateOne(
      { _id: orderId },
      { deliveryStatus: status }
    );

    return orderUpdate;
  },

  //주문 삭제
  async deleteOrder(orderId) {
    try {
      const order = await Order.findOne({ _id: orderId });

      if (!order) {
        throw new Error("주문 정보가 존재하지 않습니다!");
      }
      const deliveryStatus = order.deliveryStatus;
      if (deliveryStatus == "1") {
        // 배송전
        await Order.deleteOne({ _id: orderId });
        return "배송전";
      }
      return; //
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = adminOrderService;
