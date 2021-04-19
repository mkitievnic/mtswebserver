const { Role, User } = require('../models');
//Verify if the user role is registered in the DB
const isRolValidate = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error('the rol is not registered in the Data Base');
    }
}
//Verify if the email exist in the DB
const existEmailRegistered = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The mail ${email} exist`);
    }

}
//Verify if the user exist in the DB
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