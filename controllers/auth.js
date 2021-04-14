const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res = response) => {
    const { email, pasword } = req.body;
    try {

        //Verify if the user exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "the user or pasword are incorrect - user not exist"
            });
        }
        //Verify if the user i was not erased
        if (user.state === false) {
            return res.status(400).json({
                msg: "the user or pasword are incorrect - the user was erased"
            });
        }
        //Verify if the pasword is correct
        const isPaswordCorrect = bcryptjs.compareSync(pasword, user.pasword);
        if (!isPaswordCorrect) {
            return res.status(401).json({
                msg: "the user or pasword are incorrect - pasword incorrect"
            });
        }
        //generate JWT

        const token = await generateJWT(user._id);
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Exist someone problem with the server, comunicate with administrator"
        })
    }


}

module.exports = {
    login
}