const { Schema, model } = require('mongoose');


const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'the name of the category is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
categorySchema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();
    category.id = _id;
    return category;
}
module.exports = model('Category', categorySchema);