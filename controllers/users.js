const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { all } = require('../routes/users');

usuariosGet = async (req = request, res = response) => {
    let { limit = 3, from = 0 } = req.query;
    const stateUser = { state: true };
    /* const totUsers = await User.count();
    const users = await User.find(stateUser)
        .skip(Number(from))
        .limit(Number(limit)); */
    const [totUsers, users] = await Promise.all([
        User.countDocuments(stateUser),
        User.find(stateUser)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ totUsers, users });
}
usuariosPost = async (req = request, res = response) => {
    //the fields it was in correctly?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    let { name, email, pasword, role } = req.body;
    const user = new User({ name, email, pasword, role });

    //Check if the mail exist

    //encrypt the key
    const salt = bcryptjs.genSaltSync();
    user.pasword = bcryptjs.hashSync(pasword, salt);
    //saver the user register
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    res.json(user);
}
usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, google, email, ...rest } = req.body;
    if (rest.pasword) {
        const salt = bcryptjs.genSaltSync();
        rest.pasword = bcryptjs.hashSync(rest.pasword, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
    res.json(user)
}
usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    res.json(user);
}
usuariosPatch = (req, res) => {
    res.json({
        msg: 'respuesta patch'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}