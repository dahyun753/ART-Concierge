const { nanoid } = require('nanoid');   // 고유한 문자열 생성 라이브러리

//시간과 날짜를 편리하게 관리하기 위해 dayjs 사용
//라이브러리 용량도 Moment.js대비 약 30배 정도 가벼우며 문법 또한 비슷.
const dayjs = require('dayjs');

const orderId = {
    type: String,
    default: () => {
        const orderDate = dayjs().format("YYYYMMDD"); // 날짜와 시간 파싱. 형태예시: 20240220
        return orderDate + "-" + nanoid(8); // id 예시: 20240220-xxxxxxxx
    },
    require: true,
    index: true,
};

module.exports = orderId;