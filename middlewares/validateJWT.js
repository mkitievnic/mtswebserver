const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        req.user = await User.findById(uid);
        next();
    } catch (error) {
        if (error) {
            console.log(error);
            res.status(401).json('token invalid.')
        }
    }
}

module.exports = {
    validateJWT
}