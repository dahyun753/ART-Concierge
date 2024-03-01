const { Schema } = require("mongoose");

const validationSchema = new Schema(
    {
        // 사용자 이메일
        email: {
            type: String,
            required: true,
            unique: true, 
        },
        // 이메일 인증 번호
        validPassword: {
            type: String,
            required: false,
        },
        isTokenMatch: {
            type: Number,
            default: 0,
        }
    },
    {
        collection: "validation",
    }
);

module.exports = validationSchema;

