const { request, response } = require('express');
const { Product } = require('../models');
const { validationResult } = require('express-validator');


const listProducts = async (req = request, res = response) => {
    const { id } = req.user;
    const existProducts = await Product.countDocuments({});
    if (existProducts === 0) {
        return res.status(404).json({
            msg: "Products inexistent."
        })
    }
    let { limit = 3, from = 0 } = req.query;
    const stateProduct = { state: true };
    /* const totUsers = await User.count();
    const users = await User.find(stateUser)
        .skip(Number(from))
        .limit(Number(limit)); */
    const [totProducts, products] = await Promise.all([
        Product.countDocuments(stateProduct),
        Product.find(stateProduct)
            .populate('idUser', 'name')
            .populate('idCategory', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ totProducts, products });
}
const obtainOneProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    console.log(product);
    if (!product) {
        return res.state(404).json({
            msg: 'The product inexistent.'
        })
    }
    res.status(200).json(product);
}
const createProduct = async (req = request, res = response) => {

    let { name, idCategory, description = '' } = req.body;
    const { _id } = req.user;
    name = name.toUpperCase();
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
        return res.status(400).json('the product name exist.')
    }
    try {
        const product = new Product({ name, idUser: _id, idCategory });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error)
    }


}
const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, idCategory, state } = req.body;
    const data = {
        name: name.toUpperCase(),
        idUser: req.user.uid,
        idCategory,
        state
    }

    const product = await Product.findByIdAndUpdate(id, data);
    if (!product) {
        return res.status(500).json({
            msg: "No, it can save the register."
        })
    }

    res.status(201).json(product);
}
const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { state: false })
    if (!product) {
        res.status(500).json({
            msg: 'it can not ersaed the registered. - error DB.'
        })
    }
    res.status(201).json(product);
}
module.exports = {
    listProducts,
    obtainOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}