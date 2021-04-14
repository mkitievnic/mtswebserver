const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { catchErrors } = require('../middlewares/catchErrors');

const router = Router();
router.post('/login', [
    check('email', 'the email is required').isEmail(),
    check('pasword', 'the pasword is required').not().isEmpty(),
    catchErrors
], login);

module.exports = router;