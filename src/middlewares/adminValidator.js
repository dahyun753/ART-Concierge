const { User } = require('../db');

// 관리자 권한 확인
exports.adminValidate = async (req, res, next) => {
	const { _id } = req.user;
	const user = await User.findOne({ _id });
	if (!user.isAdmin) {
		return res.json({
			message: '관리자 권한이 없습니다. 관리자 계정으로 로그인해주세요',
		});
	}
	next();
};