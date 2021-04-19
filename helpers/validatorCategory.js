const { Category } = require('../models');
//Verify if the category exist in the DB
const existCategory = async (id = '') => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`The id category:${id}, no exist.`);
    }
}

//Verify if the category was erased or mark state false in the DB
const stateCategoryFalse = async (id = '') => {
    const category = await Category.findById(id);
    if (!category.state) {
        throw new Error('The state category was marked false.');
    }
}
module.exports = {
    existCategory,
    stateCategoryFalse
}