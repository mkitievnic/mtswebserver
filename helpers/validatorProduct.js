const { Product } = require('../models');
//Verify if the category exist in the DB
const existProduct = async (id = '') => {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error(`The id product:${id}, no exist.`);
    }
}

//Verify if the category was erased or mark state false in the DB
const stateProductFalse = async (id = '') => {
    const product = await Product.findById(id);
    if (!product.state) {
        throw new Error('The state product was marked false.');
    }
}

module.exports = {
    existProduct,
    stateProductFalse
}