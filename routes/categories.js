const { Router, response } = require('express');
const { check } = require('express-validator');

const { validateJWT, haveOneThisRoles, catchErrors } = require('../middlewares');
const { existCategory, stateCategoryFalse } = require('../helpers/validatorCategory');
const { listCategories,
    createCategory,
    obtainOneCategory,
    updateCategory,
    deleteCategory } = require('../controllers/category');

const router = Router();
//Obtain category list - paged - total - populate

router.get('/', listCategories);
//Obtain one category according its id
router.get('/:id', [
    check('id', 'Is not mongo valid id.').isMongoId(),
    validateJWT,
    catchErrors
], obtainOneCategory);
//Create a new category
router.post('/', [
    check('name', 'the category name is required.').not().isEmpty(),
    validateJWT,
    haveOneThisRoles('Adm'),
    catchErrors
], createCategory);

//Update category according its id
router.put('/:id', [
    validateJWT,
    check('id', 'Is not mongo valid id.').isMongoId(),
    check('name', 'the category name is required.').not().isEmpty(),
    check('id').custom(existCategory),
    haveOneThisRoles('Adm'),
    catchErrors
], updateCategory);
//Delete category, according its id, but only mark how state=false
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not mongo valid id.').isMongoId(),
    check('id').custom(existCategory),
    check('id').custom(stateCategoryFalse),
    haveOneThisRoles('Adm'),
    catchErrors
], deleteCategory);

module.exports = router;