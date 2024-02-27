const { Router } = require('express');
const authController = require('../controller/auth-Controller');
const router = Router();

router.post('/join', authController.postUser);

module.exports = router;