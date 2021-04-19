const { request, response } = require('express');
const { Category } = require('../models');
const { validationResult } = require('express-validator');


const listCategories = async (req = request, res = response) => {
    const existCategories = await Category.countDocuments({});
    if (existCategories === 0) {
        return res.status(404).json({
            msg: "Categories inexistent."
        })
    }
    let { limit = 3, from = 0 } = req.query;
    const stateCategory = { state: true };
    /* const totUsers = await User.count();
    const users = await User.find(stateUser)
        .skip(Number(from))
        .limit(Number(limit)); */
    const [totCategories, categories] = await Promise.all([
        Category.countDocuments(stateCategory),
        Category.find(stateCategory)
            .populate('idUser', 'name')
            .populate('idCategory', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ totCategories, categories });
}
const obtainOneCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });
    console.log(category);
    if (!category) {
        return res.status(404).json({
            msg: `The category inexistent.`
        })
    }
    res.status(200).json(category);
}
const createCategory = async (req = request, res = response) => {

    //Verify if user is autentified

    //Verify if the role user is 'Adm'

    let { name } = req.body;
    const { _id } = req.user;
    name = name.toUpperCase();
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
        return res.status(400).json('the category name exist.')
    }
    try {
        const category = new Category({ name, idUser: _id });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.log(error)
    }


}
const updateCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, state } = req.body;
    const data = {
        name: name.toUpperCase(),
        userid: req.user.uid,
        state
    }

    const category = await Category.findByIdAndUpdate(id, data);
    if (!category) {
        return res.status(500).json({
            msg: "No, it can save the register."
        })
    }

    res.status(401).json(category);
}
const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: false })
    if (!category) {
        res.status(500).json({
            msg: 'it can not ersaed the registered. - error DB.'
        })
    }
    res.status(201).json(category);
}
module.exports = {
    listCategories,
    obtainOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}