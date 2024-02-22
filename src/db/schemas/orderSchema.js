import { Schema } from 'mongoose'
const orderId = require('./types/order-id');

const orderSchema = new Schema({
    //상품 식별
    orderId,
    //주문자 관련 정보 (주문자 이름, 배송지, 전화번호)
    userId: {
        type: String,
        reauired: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    //상품 관련 정보 (주문한 상품 이름, 상품 수량, 금액, 이미지 url)
    item: [{
        exhibitName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        //배열 처리를 해야하는지 
        image: {
            type: [String],
            required: true,
        },
    }, ],
    //주문한 전체 상품 가격
    totalPrice: {
        type: Number,
        required: true,
    },
    //주문 날짜
    orderedDate: {
        type: Date,
        default: Date.now,
    },
    deliveryStatus: {
        type: String,
        default: 1,
        required: true,
    }
})

module.exports = orderSchema;