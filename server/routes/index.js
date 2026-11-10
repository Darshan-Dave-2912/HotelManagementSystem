'use strict';

const express = require('express');
const router = express.Router();

//Module routes
const rolesRoutes = require('../features/access-management/roles/roles.route');
const userRoutes = require('../features/access-management/users/users.routes');
const authRoutes = require('../features/auth/auth.route');
const moduleRoutes = require('../features/access-management/modules/module.route');
const moduleActionRoutes = require('../features/access-management/moduleActions/moduleActions.routes');

//Register routes
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/module', moduleRoutes);
router.use('/moduleAction', moduleActionRoutes);

module.exports = router;
