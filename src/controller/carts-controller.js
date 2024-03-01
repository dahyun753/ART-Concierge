const cartService = require("../services/carts-service");
const ERRORS = require("../utils/errors");

//장바구니 추가
async function postCart(req, res, next) {
  const { exhibitId, quantity } = req.body;
  try {
    const cart = await cartService.addCart(exhibitId, quantity);
    res.json({ item: cart.item });
  } catch (error) {
    res.json(error);
  }
}

//장바구니 조회
async function getCart(req, res, next) {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.json(error);
  }
}

//장바구니 수정
async function putCart(req, res, next) {
  const { exhibitId, quantity } = req.body;

  try {
    const modifyCarts = await cartService.putAllCarts(exhibitId, quantity);
    res.json(modifyCarts);
  } catch (error) {
    res.json(error);
  }
}

//장바구니 삭제
async function deleteCart(req, res, next) {
  const { exhibitId } = req.body;

  try {
    const removeCarts = await cartService.deleteCartsItem(exhibitId);
    res.json(removeCarts);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { postCart, getCart, putCart, deleteCart };
