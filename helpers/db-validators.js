const Role = require('../models/role');
const User = require('../models/user');

const isRolValidate = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error('the rol is not registered in the Data Base');
    }
}

const existEmailRegistered = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The mail ${email} exist`);
    }

}

const existIdUser = async (id = '') => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The id:${id}, no exist.`);
    }
}

module.exports = {
    isRolValidate,
    existEmailRegistered,
    existIdUser
}