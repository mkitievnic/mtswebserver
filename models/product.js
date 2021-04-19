const { Schema, model } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'the name of the product is required'],
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
    },
    price: {
        type: Number,
        default: 0
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        default: 'without description'
    },
    available: {
        type: Boolean,
        default: true
    }
});
productSchema.methods.toJSON = function () {
    const { __v, _id, ...product } = this.toObject();
    product.id = _id;
    return product;
}
module.exports = model('Product', productSchema);