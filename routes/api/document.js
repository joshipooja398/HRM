const router = require('express').Router();
const { validate } = require('express-validation');
const {isAuth} = require('../../middlewares/authentication');
const DOCUMENT_CONTROLLER = require('../../controllers/document');
const { show, create, update, destroy, isExists } = require('../../validations/document');

/**
 * Controllers
 */
const DOCUMENT = require('../../controllers/document');

router.get('/', DOCUMENT_CONTROLLER.all);
router.get('/:id',isAuth(['admin', 'user']), validate(show), isExists, DOCUMENT_CONTROLLER.show);
router.post('/', isAuth(['admin', 'user']),validate(create),DOCUMENT_CONTROLLER.store);
router.put('/:id', isAuth(['admin','user']), validate(update), isExists, DOCUMENT_CONTROLLER.update);
router.delete('/:id',isAuth(['admin','user']), validate(destroy), isExists, DOCUMENT_CONTROLLER.destroy);

module.exports = router;