const express = require('express');
const moduleActionController = require('./moduleActions.controller');
const {
    validateCreateModuleAction,
    validateListModuleActions,
    validateModuleActionId,
    validateUpdateModuleActions
} = require('./moduleActions.validator');
const router = express.Router();

router.route('/').post(validateCreateModuleAction, moduleActionController.createModuleAction);
router.route('/').get(validateListModuleActions, moduleActionController.getModuleActions);
router.route('/:id').get(validateModuleActionId, moduleActionController.getModuleActionById);
router.route('/:id').patch(validateUpdateModuleActions, moduleActionController.updateModuleAction);
router.route('/:id').delete(validateModuleActionId, moduleActionController.deleteModuleAction);

module.exports = router;