const catchAllErrors = require('../middlewares/catchErrors');
const validatesAllJWT = require('../middlewares/validateJWT');
const allMiddlewares = require('../middlewares/isAdmRole');
const otherMiddlewares = require('../middlewares/isErasedUser');

module.exports = {
    ...catchAllErrors,
    ...validatesAllJWT,
    ...allMiddlewares,
    ...otherMiddlewares
}