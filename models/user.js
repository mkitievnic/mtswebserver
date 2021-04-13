const { model, Schema } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "the name is required"]
    },
    email: {
        type: String,
        required: [true, "the email is required"],
        unique: [true, "the mail is unique"]
    },
    pasword: {
        type: String,
        required: [true, "the pasword is required"]
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: [true, "the role is required"],
        enum: ['Adm', 'Adv', 'Med', 'Ini']
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
});
userSchema.methods.toJSON = function () {
    const { __v, pasword, ...user } = this.toObject();
    return user;
}
module.exports = model('User', userSchema);