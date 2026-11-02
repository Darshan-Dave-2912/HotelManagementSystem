'use strict';

const express = require('express');
const router = express.Router();

//Module routes
const rolesRoutes = require('../features/access-management/roles/roles.route');
const userRoutes = require('../features/access-management/users/users.routes');

//Register routes
router.use('/roles', rolesRoutes);
router.use('/users', userRoutes);

module.exports = router;
