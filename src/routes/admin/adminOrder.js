const { Router } = require('express');

const { Order } = require('../../db');

const router = Router();

router.put('/:_id', async (req, res, next) => {
    //배송전 주문정보 수정 -> 배송 상태 변경
    const _id = req.params._id; // orderId
    const order = await Order.find({ _id });
    const deliveryStatus = order[0].deliveryStatus;
    console.log(deliveryStatus);
    const { status } = req.body;
    console.log(status);
    try {
        //const order = await Order.find({ _id }).lean().exec();
        //console.log(order);

        // 배송 중
        const orderUpdate = await Order.updateOne(
            { _id: _id },
            { deliveryStatus: status });

        //res.json(orderUpdate);

        if (orderUpdate.modifiedCount === 1) {
            if (status === "2") {
                res.send("주문 상태가 배송중으로 수정되었습니다.");
            } else if (status === "3") {
                res.send("주문 상태가 배송완료로 수정되었습니다.");
            } else {
                res.send("허용된 주문이 아닙니다");
            }
        } else {
            res.send("주문 수정에 실패했습니다.");
        }
    } catch (err) {
        res.json(err);
    }
});


// 관리자 주문 삭제(취소)
router.delete("/", async (req, res, next) => {
    try {
        await Order.deleteMany({});
        res.send('OK');
    } catch (err) {
        console.log("전체 주문 삭제가 실패되었습니다.")
        res.json(err);
    }
})

module.exports = router;