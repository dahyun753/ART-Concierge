
const { Router } = require('express');

const authService = require('../services/auth-service');

async function uniqueEmail (req, res, next) {
    try {
        const user = User.findOne({ email: req.body.email });
        const uniqueEmail = await checkEmail(userInfo.email);
        const newUser = await authService.addUser( userInfo  );

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

async function postUser (req, res, next) {
    try {
        const userInfo  = req.body;
        const newUser = await authService.addUser( userInfo  );

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {postUser, uniqueEmail};