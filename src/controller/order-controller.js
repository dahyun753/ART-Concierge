const orderService = require("../services/order-service");


const orderController = {
  //주문하기
  async postOrder(req, res, next) {
    try {
      const {
        items,
        userAddress,
        detailAddress,
        phone,
        name,
      } = req.body;
  
      const user_Id = req.user;
  
      const orderedDate = new Date(); 
  
      const newOrders = await Promise.all(items.map(async item => {
        const {
          exhibitId,
          exhibitName,
          quantity,
          price,
          image
        } = item;
  
        const newOrder = await orderService.createOrder({
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
        });
  
        return newOrder;
      })); 

      // console.log(newOrders);
      res.status(201).json(newOrders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '입력값을 확인해주세요' });
    }
  },

  //주문 조회 (사용자의 주문내역)
  async getOrder(req, res, next) {
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
  
      const result = await orderService.updateOrder(orderId,  quantity, userAddress, detailAddress, phone, name);
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
        res.status(500).json(error);
      }
    },
  }

module.exports = orderController;
