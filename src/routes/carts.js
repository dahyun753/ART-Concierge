const { Router } = require("express");
const { Order } = require("../db/index.js");
const router = Router();

// C,R은 res.json으로 넘겨주면 된다.

//장바구니 추가
router.post("/", async (req, res, next) => {
  const { exhibitId, quantity } = req.body;
  try {
    const existCart = await Order.findOne({ "item.exhibitId": exhibitId });

    // 동일한 exhibitId를 가진 항목이 있으면, 갯수를 추가합니다.
    if (existCart) {
      for (let item of existCart.item) {
        if (item.exhibitId === exhibitId) {
          item.quantity += quantity;
          break;
        }
      }
      await existCart.save();
      res.json({
        item: existCart.item,
      });
    } else {
      // 동일한 exhibitId를 가진 항목이 없으면, 새로운 항목을 생성합니다.
      const newCart = await Order.create({
        exhibitId,
        item: [
          {
            exhibitId,
            quantity,
          },
        ],
      });
      res.json({
        item: newCart.item,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

//장바구니 목록 조회
router.get("/", async (req, res, next) => {
  try {
    const carts = await Order.find({});
    const cartList = carts.map((order) => ({
      exhibitId: order.exhibitId,
      item: order.item,
    }));
    res.json(cartList);
  } catch (error) {
    res.json(error);
  }
});

//장바구니 수정
router.put("/", async (req, res, next) => {
  const { exhibitId, quantity } = req.body;
  try {
    const updatedCart = await Order.updateOne(
      { "item.exhibitId": exhibitId },
      { $set: { "item.0.quantity": quantity } }
    );

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.json(error);
  }
});

//장바구니 삭제
router.delete("/", async (req, res, next) => {
  const { exhibitId } = req.body;
  try {
    if (exhibitId) {
      // exhibitsId 배열에 속한 장바구니 상품 삭제
      const deleteCart = await Order.deleteMany({
        "item.exhibitId": { $in: exhibitId },
      });
    } else {
      // exhibitsId가 제공되지 않았다면 모든 장바구니 상품 삭제 -> postman에서 모두삭제가 안되고 있는데 원인을 모르겠습니다..ㅠ
      const deleteAllCart = await Order.deleteMany({});
    }
    res.json("ok");
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
