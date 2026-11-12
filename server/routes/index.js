'use strict';

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeResource } = require('../middlewares/authorize.middleware');
const { MODULE_CODES } = require('../config/accessControl.config');

//Module routes
const rolesRoutes = require('../features/access-management/roles/roles.route');
const userRoutes = require('../features/access-management/users/users.routes');
const authRoutes = require('../features/auth/auth.route');
const moduleRoutes = require('../features/access-management/modules/module.route');
const moduleActionRoutes = require('../features/access-management/moduleActions/moduleActions.routes');
const permissionRoutes = require('../features/access-management/permissions/permissions.routes');

//Register routes
router.use('/roles', authenticate, authorizeResource(MODULE_CODES.ROLES), rolesRoutes);
router.use('/users', authenticate, authorizeResource(MODULE_CODES.USERS), userRoutes);
router.use('/auth', authRoutes);
router.use('/module', authenticate, authorizeResource(MODULE_CODES.MODULES), moduleRoutes);
router.use('/moduleAction', authenticate, authorizeResource(MODULE_CODES.MODULE_ACTIONS), moduleActionRoutes);
router.use('/permissions', authenticate, authorizeResource(MODULE_CODES.PERMISSIONS), permissionRoutes);

module.exports = router;
