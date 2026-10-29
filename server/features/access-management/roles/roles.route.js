const express = require('express');
const roleController = require('./roles.controller');
const { validateCreateRole, validateRoleId, validateUpdateRole, validateListRoles } = require('./roles.validator');

const router = express.Router();

router.route('/').post(validateCreateRole, roleController.createRole);
router.route('/').get(validateListRoles, roleController.getRole);
router.route('/:id').get(validateRoleId, roleController.getRoleById);
router.route('/:id').patch(validateUpdateRole, roleController.updateRole);
router.route('/:id').delete(validateRoleId, roleController.DeleteRole);

module.exports = router;