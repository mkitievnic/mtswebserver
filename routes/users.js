const { Router } = require('express');
const { check } = require('express-validator');

/* const { catchErrors } = require('../middlewares/catchErrors');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdmRole, haveOneThisRoles } = require('../middlewares/isAdmRole');
const { isErasedUser } = require('../middlewares/isErasedUser'); */
const { catchErrors,
    validateJWT,
    isAdmRole,
    haveOneThisRoles,
    isErasedUser } = require('../middlewares');

const { isRolValidate, existEmailRegistered, existIdUser } = require('../helpers/db-validators');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/users');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    //check('email', 'The mail is required').not().isEmpty(),
    check('email', 'The mail is not valid').isEmail(),
    check('email').custom(existEmailRegistered),
    check('name', 'The name is required').not().isEmpty(),
    //check('pasword', 'The pasword is required').not().isEmpty(),
    check('pasword', 'The pasword required 6 lenght letters').isLength({ min: 6 }),
    //check('role', 'The role is not valid').isIn(['Adm', 'Med', 'Adv', 'Ini']),
    check('role').custom(isRolValidate),
    catchErrors
], usuariosPost);
router.put('/:id', [
    check('id', 'The id no is a mongoId valid').isMongoId(),
    check('id').custom(existIdUser),
    check('role').custom(isRolValidate),
    catchErrors
], usuariosPut);
router.delete('/:id', [
    validateJWT,
    /* isAdmRole, */
    haveOneThisRoles('Adm', 'Adv'),
    isErasedUser,
    check('id', 'The id no is a mongoId valid').isMongoId(),
    check('id').custom(existIdUser),
    catchErrors
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router