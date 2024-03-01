const { Order } = require("../db");

const orderService = {
  //주문하기
  async createOrder({
    userId: user_Id,
    name,
    phone,
    userAddress,
    detailAddress,
    item: [{ exhibitId, exhibitName, quantity, price, image }],
    orderedDate,
  }) {
    const createOrder = await Order.create({
      userId: user_Id,
      name,
      phone,
      userAddress,
      detailAddress,
      item: [{ exhibitId, exhibitName, quantity, price, image }],
      orderedDate,
    });
    return createOrder;
  },

  //사용자의 주문 조회
  async getOrder(user_Id) {
    try {
      const orders = await Order.find({ userId: user_Id });
      const orderList = orders.map((order) => ({
        _id: order._id,
        item: order.item,
        name: order.name,
        deliveryStatus: order.deliveryStatus,
        orderedDate: order.orderedDate
      }));
      return orderList;
    } catch (err) {
      console.log(err);
    }
  },

  //주문 수정
  async updateOrder(user_Id, userAddress, detailAddress, phone, name) {
    try {
      const order = await Order.find({ userId: user_Id });

      const deliveryStatus = order[0].deliveryStatus;
      if (deliveryStatus == 1) {
        await Order.updateMany(
          { userId: user_Id },
          { userAddress, detailAddress, phone, name }
        );
        console.log(name + "유저의 주문정보가 수정되었습니다");
        return "배송전";
      } else {
        return "배송중";
      }
    } catch (err) {
      console.log("유저의 주문정보 수정에 실패했습니다." + err);
    }
  },

  //사용자의 주문 수정 (주문 전 주문 취소)
    async deleteOrder(user_Id, orderId) {
      try {
        const order = await Order.find({ _id: orderId, userId: user_Id });
        console.log(order)
        if (!order) {
          console.log("주문이 존재하지 않습니다.");
          return 0;
        }
  
        const deliveryStatus = order[0].deliveryStatus;
        if (deliveryStatus === "1") {
          await Order.deleteOne({ "_id": orderId, userId: user_Id });
          console.log("유저의 주문이 취소되었습니다.");
          return 1;
        } else {
          console.log("이미 배송된 상품입니다.");
          return 2;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
}

module.exports = orderService;
