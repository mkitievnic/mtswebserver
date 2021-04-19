const { response } = require("express");
const { User, Product, Category } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = ['user', 'product', 'category', 'role'];
//search users
const searchUser = async (criteria, res = response) => {
    const isIdValid = ObjectId.isValid(criteria);
    if (isIdValid) {
        let user = await User.findById({ _id: criteria });
        user = (user) ? user : {};
        return res.json(user);
    }
    const regexp = new RegExp(criteria, 'i');
    const results = await User.find({
        $or: [{ name: regexp }, { email: regexp }],
        $and: [{ state: true }]
    });
    res.json(results);
}
//search category
const searchCategory = async (criteria, res = response) => {
    const isIdValid = ObjectId.isValid(criteria);
    if (isIdValid) {
        let category = await Category.findById({ _id: criteria });
        category = (category) ? category : {};
        return res.json(category);
    }
    const regexp = new RegExp(criteria, 'i');
    const results = await Category.find({ name: regexp, state: true });
    res.json(results);
}
//search category
const searchProduct = async (criteria, res = response) => {
    const isIdValid = ObjectId.isValid(criteria);
    if (isIdValid) {
        let product = await Product.findById({ _id: criteria });
        product = (product) ? product : {};
        return res.json(product);
    }
    const regexp = new RegExp(criteria, 'i');
    const results = await Product.find({
        $or: [{ name: regexp }, { description: regexp }],
        $and: [{ state: true }]
    });
    res.json(results);
}
const search = (req, res = response) => {
    const { collection, criteria } = req.params;
    const isAllowed = allowedCollections.includes(collection);
    if (!isAllowed) {
        return res.status(400).json({
            msg: `the collections allowed are:${allowedCollections}`
        })
    }
    switch (collection) {
        case 'user':
            searchUser(criteria, res);
            break;
        case 'product':
            searchProduct(criteria, res);
            break;
        case 'category':
            searchCategory(criteria, res);
            break;
        default:
            res.status(500).json({
                msg: `It was not implementing for the collection:${collection}`
            });
            break;
    }
}

module.exports = {
    search
}