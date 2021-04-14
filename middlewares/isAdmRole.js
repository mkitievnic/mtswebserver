const { request, response } = require("express");

const isAdmRole = (req = request, res = response, next) => {
    const { role, state } = req.user;
    if (!req.user) {
        return res.status(401).json({
            msg: "token invalid - the user no exist"
        });
    }
    if (!state) {
        return res.status(401).json({
            msg: "token invalid - the user was erased"
        });
    }
    if (role !== 'Adm') {
        return res.status(401).json({
            msg: "token invalid - the rol is not Adm"
        });
    }
    next();
}
const haveOneThisRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status('401').json({
                msg: 'For erased a user you need auth'
            })
        }
        if (!roles.includes(req.user.role)) {
            return res.status('401').json({
                msg: `For erased a user you need to have this roles: ${roles}`
            })
        }
        next();

    }
}
module.exports = {
    isAdmRole,
    haveOneThisRoles
}
