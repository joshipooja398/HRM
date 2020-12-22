const router = require('express').Router();

router.use('/',require('./webroute'));
router.use('/api',require('./api'));

module.exports = router;
