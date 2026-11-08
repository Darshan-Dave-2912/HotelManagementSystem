const express = require('express');
const moduleController = require('./modules.controller');
const { 
    validateCreateModule,
    validateModuleId,
    validateUpdateModule,
    validateListModules
 } = require('./modules.validator');

 const router = express.Router();

 router.route('/').post(validateCreateModule, moduleController.createModule);
 router.route('/').get(validateListModules, moduleController.getModule);
 router.route('/:id').get(validateModuleId, moduleController.getModuleById);
 router.route('/:id').patch(validateUpdateModule, moduleController.updateModule);
 router.route('/:id').delete(validateModuleId, moduleController.DeleteModule);

 module.exports = router;