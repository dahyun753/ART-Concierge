const { Router } = require('express');
//const { orderController } = require('../controller');

const { Order } = require('../db');
const { User } = require("../db");

const router = Router();

//주문추가, 주문하기
router.post('/', async (req, res, next) => {
    const { item: [{exhibitId, exhibitName, quantity, price, image}], userAddress, phone, userName } = req.body;
    const orderedDate = new Date(); // 주문일을 현재 날짜로 설정
    console.log(req.body);
    try {
        // 여기에서 주문을 생성하고 데이터베이스에 저장
        const newOrder = await Order.create({
            userName,
            phone,
            userAddress,
            item: [{
                exhibitId,
                exhibitName,
                quantity,
                price,
                image
            }],
            orderedDate
        });
        res.json({ 
            _id: newOrder._id, 
            userName: newOrder.userName
        });
    } catch (err) {
        res.json(err);
    }
})

// 주문조회
router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.find({});
        const orderList = orders.map((order) => ({
            // orderId: order.orderId,
            _id: order._id,
            item: order.item,
            userName: order.userName,
            deliveryStatus: deliveryStatus
        }));
        res.json(orderList);
    } catch (err) {
        res.json(err);
    }
});

router.put('/:_id', async (req, res, next) => {
    //배송전 주문정보 수정
    const _id = req.params._id;
    const { exhibitId, exhibitName, userAddress, phone, userName } = req.body;
    try {
        const order = await Order.find({ _id }).lean().exec();
        console.log(order);
        const deliveryStatus = order[0].deliveryStatus;
        if (deliveryStatus == 1) {
            await Order.updateMany(
                { _id: _id },
                { userAddress, phone, userName }).lean();
            res.send("유저 주문 정보가 수정되었습니다.");
            console.log(userName);
        } else {
            res.send("이미 배송중인 상품입니다.");
        }
    } catch (err) {
        res.json(err);}
});

// 주문 정보 수정(배송지, 휴대폰 번호) - 배송 전까지 정보 수정 가능
router.put('/:_id', async (req, res, next) => {
    //배송전 주문정보 수정
    const _id = req.params._id;
    const { userAddress, phone, userName, exhibitId, exhibitName } = req.body;
    try {
        const order = await Order.findOne({ _id });
        console.log(order);
        const deliveryStatus = order[0].deliveryStatus;
        if (deliveryStatus == 1) {
            await Order.updateOne(
                { "item.exhibitId": exhibitId },
                {  $set: {userAddress, phone, userName, "itme.0.exhibitName": exhibitName} });
            res.send("유저 주문 정보가 수정되었습니다.");
        } else {
            res.send("이미 배송중인 상품입니다.");
        }
    } catch (err) {
        res.json(err);
    }
});

//유저 주문 취소 - 배송 전까지
router.delete('/:_id', async (req, res, next) => {
    const _id = req.params._id;
    try {
        const order = await Order.find({_id}).lean();
        const deliveryStatus = order[0].deliveryStatus;
        if (deliveryStatus == 1) {
            await Order.deleteOne({ _id});
            res.status(200).send("유저의 주문이 취소되었습니다");
        } 
    } catch (err) {
        res.json(err);
    }
})


module.exports = router;

