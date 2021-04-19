const { Router, response } = require('express');
const { check } = require('express-validator');

const { validateJWT, haveOneThisRoles, catchErrors } = require('../middlewares');
const { existProduct, stateProductFalse } = require('../helpers/validatorProduct');
const { existCategory } = require('../helpers/validatorCategory');
const { listProducts,
    createProduct,
    obtainOneProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product');

const router = Router();
//Obtain product list - paged - total - populate

router.get('/', [
    validateJWT,
    catchErrors
], listProducts);
//Obtain one product according its id
router.get('/:id', [
    validateJWT,
    check('id', 'Is not mongo valid id.').isMongoId(),
    catchErrors
], obtainOneProduct);
//Create a new product
router.post('/', [
    validateJWT,
    check('name', 'the product name is required.').not().isEmpty(),
    haveOneThisRoles('Adm'),
    check('idCategory', 'The category is required'),
    check('idCategory').custom(existCategory),
    catchErrors
], createProduct);

//Update product according its id
router.put('/:id', [
    validateJWT,
    check('id', 'Is not mongo valid id.').isMongoId(),
    check('name', 'the product name is required.').not().isEmpty(),
    check('idCategory', 'the category is required.').not().isEmpty(),
    check('idCategory').custom(existCategory),
    check('id').custom(existProduct),
    haveOneThisRoles('Adm'),
    catchErrors
], updateProduct);
//Delete product, according its id, but only mark how state=false
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not mongo valid id.').isMongoId(),
    check('id').custom(existProduct),
    check('id').custom(stateProductFalse),
    haveOneThisRoles('Adm'),
    catchErrors
], deleteProduct);

module.exports = router;