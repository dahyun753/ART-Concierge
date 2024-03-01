const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    //사용자 이름
    name: {
      type: String,
      required: true,
    },
    //사용자 이메일
    email: {
      type: String,
      required: true,
    },
    //사용자 비밀번호
    password: {
      type: String,
      //소셜 로그인 넣을 경우에는 false
      required: true,
    },
    //사용자 전화번호
    phone: {
      type: String,
      required: true,
    },
    //사용자 주소
    userAddress: {
      type: String,
      required: false,
    },
    //사용자 주소 상세
    detailAddress: {
      type: String,
      required: false,
    },
    //관리자 여부
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

module.exports = userSchema;
