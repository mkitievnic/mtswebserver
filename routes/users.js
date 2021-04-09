const { Router } = require('express');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/users');

const router = Router();

router.get('/:id', usuariosGet);
router.post('/', usuariosPost);
router.put('/', usuariosPut);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router