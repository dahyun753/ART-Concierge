async function checkEmail(req, res, next) {
    const email = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw new Error('이미 가입된 이메일입니다');
    }

    next();
}

module.exports = checkEmail;