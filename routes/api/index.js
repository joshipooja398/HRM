const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/payroll',require('./payroll'));
router.use('/document',require('./document'));

module.exports = router;
