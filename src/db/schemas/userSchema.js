const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const userSchema = new Schema({
    shortId,    //사용자 고유번호 -> 고객 식별
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        //소셜 로그인 넣을 경우에는 false
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: false,
    },
    //관리자 여부
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{
    collection: "users"
});

module.exports = userSchema;