const adminOrderService = require("../services/admin-order-service");
const ERRORS = require("../utils/errors");

const adminOrderController = {
  //주문 조회 (관리자 페이지)
  async getOrder(req, res, next) {
    try {
      const orderList = await adminOrderService.searchOrder();

      if (!orderList) {
        res.json("주문 목록이 비었습니다.");
      }
      res.json(orderList);
    } catch (err) {
      const { statusCode, message } = err.statusCode
        ? err
        : ERRORS.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({ message });
    }
  },

  //주문 수정 (관리자 페이지)
  async updateState(req, res, next) {
    try {
      //배송전 주문정보 수정 -> 배송 상태 변경
      const orderId = req.params.orderId; // orderId
      const { status } = req.body;
      console.log(status);
      //배송 중
      const orderUpdate = await adminOrderService.updateState(orderId, status);

      //수정 되었는지 여부 체크
      if (orderUpdate.modifiedCount >= 1) {
        if (status === "2") {
          res.json("주문 상태가 배송중으로 수정되었습니다.");
        } else if (status === "3") {
          res.json("주문 상태가 배송완료로 수정되었습니다.");
        } else {
          res.json("주문 상태는 2(배송중)과 3(배송완료)로만 입력해주세요.");
        }
      } else {
        res.json("배송상태를 이전과 동일하게 선택할 수 없습니다.");
      }
    } catch (err) {
      const { statusCode, message } = err.statusCode ? err : ERRORS.BAD_REQUEST;
      res.status(statusCode).json({ message });
    }
  },

  //주문 삭제(관리자 페이지)
  async deleteOrder(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const isDelivered = await adminOrderService.deleteOrder(orderId);

      if (isDelivered === "배송전") {
        res.status(200).json("유저의 주문이 취소되었습니다");
      } else {
        res.json("배송 중이거나 완료한 상품은 주문삭제가 불가합니다!");
      }
    } catch (err) {
      const { statusCode, message } = err.statusCode ? err : ERRORS.BAD_REQUEST;
      res.status(statusCode).json({ message });
    }
  },
};

module.exports = adminOrderController;
