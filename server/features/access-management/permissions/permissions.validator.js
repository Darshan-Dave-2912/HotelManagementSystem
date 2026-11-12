const { body, query, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((error) => ({
                field: error.path,
                message: error.msg,
            })),
        });
    }
    next();
}

const validateRoleIdParam = [
    param('roleId').isInt({ min: 1 }).withMessage('Role ID must be a positive number').bail().toInt(),
    validateRequest,
];

const validateGrantRevoke = [
    body('roleId')
    .exists({ checkNull: true })
    .withMessage('Role ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive number')
    .bail()
    .toInt(),

    body('moduleActionId')
    .exists({ checkNull: true })
    .withMessage('Module action ID is required')
    .bail()
    .isUUID()
    .withMessage('Module action ID must be a valid UUID'),

    validateRequest,
];

const validateSyncPermissions = [
    param('roleId').isInt({ min: 1 }).withMessage('Role ID must be a positive number').bail().toInt(),

    body('moduleActionIds')
    .exists({ checkNull: true })
    .withMessage('moduleActionIds is required')
    .bail()
    .isArray({ max: 1000 })
    .withMessage('moduleActionIds must be an array with at most 1000 items'),

    body('moduleActionIds.*')
    .isUUID()
    .withMessage('Each module action ID must be a valid UUID'),

    validateRequest,
];

const validateListPermissions = [
    query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),

    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),

    query('roleId').optional().isInt({ min: 1 }).withMessage('roleId must be a positive number'),

    query('moduleActionId').optional().isUUID().withMessage('moduleActionId must be a valid UUID'),

    query('status').optional().isIn(['active', 'revoked', 'all']).withMessage('status must be active, revoked or all'),

    query('sortBy').optional().isIn(['grantedAt', 'revokedAt']).withMessage('Invalid sortBy field'),

    query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('sortOrder must be ASC or DESC'),

    validateRequest,
];

module.exports = {
    validateRoleIdParam,
    validateGrantRevoke,
    validateSyncPermissions,
    validateListPermissions,
};