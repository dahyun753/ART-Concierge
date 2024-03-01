const { Schema } = require("mongoose");

const exhibitSchema = new Schema(
  {
    //전시(상품) 이름
    exhibitName: {
      type: String,
      required: true,
    },
    //전시(상품) 장소(및 주소)
    exhibitAddress: {
      type: String,
      required: true,
    },
    //전시(상품) 가격
    price: {
      type: String,
      required: true,
    },
    //전시(상품) 시작일
    startDate: {
      type: String,
      required: true,
    },
    //전시(상품) 종료일
    endDate: {
      type: String,
      required: true,
    },
    //전시(상품) 카테고리
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    //전시(상품) 작가
    author: {
      type: String,
      required: true,
    },
    //전시(상품) 설명 및  정보
    information: {
      type: String,
      required: true,
    },
    //전시(상품) 이미지
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "exhibits",
  }
);

module.exports = exhibitSchema;
