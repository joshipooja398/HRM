const router = require('express').Router();
const { validate } = require('express-validation');
const {isAuth} = require('../../middlewares/authentication');
const PAYROLL_CONTROLLER = require('../../controllers/payroll');
const PAYROLL = require('../../models/payroll');
const { all,show,update,destroy,isExists,create } = require('../../validations/payroll');

router.get('/', PAYROLL_CONTROLLER.all);
router.get('/:id',isAuth(['admin','user']),validate(show), isExists,PAYROLL_CONTROLLER.show);
router.post('/', isAuth(['admin', 'user']), validate(create), PAYROLL_CONTROLLER.store);
router.put('/:id', isAuth(['admin','user']), validate(update), isExists, PAYROLL_CONTROLLER.update);
router.delete('/:id',isAuth(['admin','user']), validate(destroy), isExists, PAYROLL_CONTROLLER.destroy);

module.exports = router