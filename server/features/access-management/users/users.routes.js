const express = require('express');
const userController = require('./users.controller');
const { validateCreateUser, validateListUsers, validateUpdateUser, validateUserId } = require('./users.validator');

const router = express.Router();

router.route('/').post(validateCreateUser, userController.createUser);
router.route('/').get(validateListUsers, userController.getUser);
router.route('/:id').get(validateUserId, userController.getUserById);
router.route('/:id').patch(validateUpdateUser, userController.updateUser);
router.route('/:id').delete(validateUserId, userController.deleteUser);

module.exports = router;