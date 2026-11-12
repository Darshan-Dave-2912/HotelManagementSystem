const express = require('express');
const permissionController = require('./permissions.controller');
const { authorize } = require('../../../middlewares/authorize.middleware');
const { MODULE_CODES, ACTION_CODES } = require('../../../config/accessControl.config');
const {
    validateRoleIdParam,
    validateGrantRevoke,
    validateSyncPermissions,
    validateListPermissions,
} = require('./permissions.validator');

const router = express.Router();

// NOTE: authenticate routes/index.js me lag chuka hai

// Sirf login chahiye, koi permission nahi (har user apni permissions dekh sakta hai)
router.route('/me').get(permissionController.getMyPermissions);

router.route('/history').get(
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.VIEW),
    validateListPermissions,
    permissionController.getPermissionHistory
);

router.route('/roles/:roleId').get(
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.VIEW),
    validateRoleIdParam,
    permissionController.getRolePermissions
);

router.route('/roles/:roleId/sync').put(
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.GRANT),
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.REVOKE),
    validateSyncPermissions,
    permissionController.syncRolePermissions
);

router.route('/grant').post(
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.GRANT),
    validateGrantRevoke,
    permissionController.grantPermission
);

router.route('/revoke').post(
    authorize(MODULE_CODES.PERMISSIONS, ACTION_CODES.REVOKE),
    validateGrantRevoke,
    permissionController.revokePermission
);

module.exports = router;