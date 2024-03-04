const { User } = require("../db/index.js");
const hashed = require('../utils/hash-password');

//회원정보 조회
async function searchOne(user_Id) {
    try {
        const user = await User.findOne({ _id: user_Id });

        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const userInfo = {
            name: user.name,
            email: user.email,
            userAddress: user.userAddress,
            detailAddress: user.detailAddress,
            phone: user.phone,
            isAdmin: user.isAdmin,
        };
        return userInfo;
    } catch (err) {
        console.error(err);
        throw new Error('회원 정보 조회 중 에러가 발생했습니다.');
    }
}

//회원 정보 수정
async function putOneUser(content, user_Id) {
    try {
        const updatedUser = await User.updateOne(
            { _id: user_Id },
            content
        );

        if (!updatedUser) {
            throw new Error('사용자를 찾을 수 없습니다.');
        }

        return updatedUser;
    } catch (err) {
        console.error(err);
        throw new Error('회원 정보 수정 중 에러가 발생했습니다.');
    }
}

//회원 탈퇴
async function deleteOneUser(user_Id) {
    const deleteUser = await User.deleteMany({ _id: user_Id });
    return;
}
module.exports = { searchOne, putOneUser, deleteOneUser };
