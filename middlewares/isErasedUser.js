const { request, response } = require("express");
const { User } = require('../models');

const isErasedUser = async (req = request, res = response, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(401).json({
            msg: "token invalid - the user that intent eraser, was erased "
        });
    }
    if (!user.state) {
        return res.status(401).json({
            msg: "the user that intent eraser, was mark how erased "
        });
    }
    next();
}
module.exports = {
    isErasedUser
}