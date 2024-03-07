const { Order } = require("../db");

const orderService = {
  // 주문하기
  async createOrder({
    user_Id,
    name,
    phone,
    userAddress,
    detailAddress,
    exhibitId,
    exhibitName,
    quantity,
    price,
    item,
    image,
    orderedDate,
  }) {
    try {
      const createdOrder = await Order.create({
        userId: user_Id,
        name,
        phone,
        userAddress,
        detailAddress,
        exhibitId,
        exhibitName,
        quantity,
        price,
        item,
        image,
        orderedDate,
      });

      return createdOrder;
    } catch (err) {
      console.error(err);
      throw new Error('Error creating order');
    }
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
  async updateOrder(orderId, newQuantity, userAddress, detailAddress, phone, name ) {
    try {
      const order = await Order.findOne({_id:orderId});
      console.log(order)


      if (!order) {
        return "주문이 존재하지 않습니다.";
      }
      const item = order.item[0];

      if (item) {
        item.quantity = newQuantity;
      }

      await Order.updateOne(
        {_id : orderId},
        {
          item: [item],
          userAddress,
          detailAddress,
          phone,
          name,
        }
      );
      
        console.log(`${name} 유저의 주문정보가 수정되었습니다`);
  
    } catch (err) {
      console.log("유저의 주문정보 수정에 실패했습니다." + err);
      throw err;
    }
  },

  //사용자의 주문 수정 (주문 전 주문 취소) _ 주문 삭제
    async deleteOrder(orderId) {
      try {
        const order = await Order.find({ _id: orderId });
        console.log(order)
        if (!order) {
          console.log("주문이 존재하지 않습니다.");
          return;
        }
        await Order.deleteOne({ _id: orderId  });
          
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
}

module.exports = orderService;
