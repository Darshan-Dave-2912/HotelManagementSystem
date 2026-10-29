'use strict';

const express = require('express');
const router = express.Router();

//Module routes
const rolesRoutes = require('../features/access-management/roles/roles.route');

//Register routes
router.use('/roles', rolesRoutes);

module.exports = router;
