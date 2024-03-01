const { Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // 'User' 모델 참조
      required: true,
    },
    //사용자 이름
    name: {
      type: String,
      required: true,
    },
    //사용자 주소
    userAddress: {
      type: String,
      required: true,
    },
    //사용자 주소 상세
    detailAddress: {
      type: String,
      required: true,
    },
    //사용자 전화번호
    phone: {
      type: String,
      required: true,
    },
    //상품 관련 정보 (주문한 상품 이름, 상품 수량, 금액, 이미지)
    item: [
      {
        exhibitId: {
          type: Schema.Types.ObjectId,
          ref: "Exhibit", // 'Exhibit' 스키마모델을 참조
          required: true,
        },
        //전시(상품) 이름
        exhibitName: {
          type: String,
          required: false,
        },
        //전시(상품) 갯수
        quantity: {
          type: Number,
          required: true,
        },
        //전시(상품) 가격
        price: {
          type: Number,
          required: false,
        },
        //전시(상품) 이미지
        image: {
          type: String,
          required: false,
        },
      },
    ],
    //주문한 전체 상품 가격
    totalPrice: {
      type: Number,
      required: false,
    },
    //주문 날짜
    orderedDate: {
      type: Date,
      default: Date.now,
    },
    //배송 상태
    deliveryStatus: {
      type: String,
      default: 1,
    },
  },
  {
    collection: "orders",
  }
);

module.exports = orderSchema;
