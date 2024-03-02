const orderService = require("../services/order-service");


const orderController = {
  //주문하기
  async postOrder(req, res, next) {
    try {
      const {
        item: [{ exhibitId, exhibitName, quantity, price, image }],
        userAddress,
        detailAddress,
        phone,
        name,
      } = req.body;

      const user_Id = req.user;

      const orderedDate = new Date(); //주문일을 현재 날짜로 설정
      //주문 생성 후 DB에 저장
      const newOrder = await orderService.createOrder({
        userId: user_Id,
        name,
        phone,
        userAddress,
        detailAddress,
        item: [{ exhibitId, exhibitName, quantity, price, image }],
        orderedDate,
      });
      console.log(newOrder);
      res.json({
        userId: newOrder.userId,
        name: newOrder.name,
      });
    } catch (err) {
      res.json(err)
    }
  },

  //주문 조회
  async getOrder(req, res, next) {
    //사용자의 주문내역
    try {
      const user_Id = req.user;
      const orderList = await orderService.getOrder(user_Id);
      res.json(orderList);
    } catch (err) {
      res.json(err)
    }
  },

  //주문 수정
  async updateOrder(req, res, next) {
    try {
      const userId = req.user;
      let { orderId } = req.params; 
      const { userAddress, detailAddress, phone, name, quantity } = req.body;
  
      const result = await orderService.updateOrder(orderId, userAddress, detailAddress, phone, name, quantity);
      res.json('수정완료!')
    } catch (err) {
      res.json(err);
    }
  },

  //주문 삭제
    async deleteOrder(req, res, next) {
      try {
        const user_Id = req.user;
        const {orderId} = req.params;
        await orderService.deleteOrder(orderId);
  
        res.json('삭제 완료');
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  }

module.exports = orderController;
