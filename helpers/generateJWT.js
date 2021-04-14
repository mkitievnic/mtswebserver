const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    const payload = { uid };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('I can not generate the token');
            } else {
                resolve(token);
            }
        })
    });
};

module.exports = {
    generateJWT
}