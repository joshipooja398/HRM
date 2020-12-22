const router = require('express').Router();
const { validate } = require('express-validation');
const { login, signup } = require('../../validations/auth');

/**
 * Controllers
 */
const AUTH=require('../../controllers/auth');
const USER=require('../../models/user');

router.post('/signup', validate(signup), AUTH.signup);
router.post('/login', validate(login), AUTH.login);

module.exports = router;