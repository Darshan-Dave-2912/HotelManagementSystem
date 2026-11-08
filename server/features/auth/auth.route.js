const express = require('express');
const authController = require('./auth.controller');
const { validateLogin } = require('./auth.validator');
const { authenticate } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.route('/login').post(validateLogin, authController.login);
router.route('/refresh').post(authController.refresh);
router.route('/logout').post(authController.logout);
router.route('/me').get(authenticate, authController.me);

module.exports = router;