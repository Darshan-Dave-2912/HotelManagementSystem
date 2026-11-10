const { body, query, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((error) => ({
                field: error.path,
                message:error.msg
            })),
        })
    }
    next();
}

const validateModuleActionId = [
    param('id')
    .isUUID(7)
    .withMessage('Module Action ID must be a uuidv7'),
    validateRequest,
];

const validateCreateModuleAction = [
    body('moduleId')
    .exists({ checkNull:true })
    .withMessage('module ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('module ID must be a positive number')
    .bail()
    .toInt(),

    body('name')
    .exists({ checkNull: true })
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .bail()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Name can only contain letters, numbers and underscores')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Module Action name cannot exceed 30 characters'),

    body('code')
    .exists({ checkNull: true })
    .withMessage('Module Action code is required')
    .bail()
    .isString()
    .withMessage('Module Action code must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module Action code cannot be empty')
    .bail()
    .isLength({ max: 6 })
    .withMessage('module Action code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Module actions code can only contain letters, number and underscores'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
    
    validateRequest
];

const validateUpdateModuleActions = [
    param('id')
    .isUUID(7)
    .withMessage('Module Action ID must be a uuidv7'),

    body('name')
    .optional()
    .isString()
    .withMessage('Module Action must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module Actions name cannot be empty')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Module Action name cannot exceed 30 characters')
    .bail()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Name can only contain letters, numbers and underscores'),

    body('code')
    .optional()
    .isString()
    .withMessage('Module Actions code must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module Action code cannot be empty')
    .bail()
    .isLength({ max: 6 })
    .withMessage('Module Action code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Module Action code can contain letters, numbers and underscores'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    body().custom((value) => {
        const allowedFields = ['name','code','isActive'];

        if(!value || typeof value !== 'object' || Array.isArray(value))
        {
            throw new Error('Provide at least one field for update')
        };
    
        const keys = Object.keys(value);
        const invalidFields = keys.filter((k) => !allowedFields.includes(k));

        if (!keys.some((k) => allowedFields.includes(k))) {
            throw new Error('Provide at least one field for update');
        }
        
        if (invalidFields.length > 0) {
            throw new Error(`Unsupported Fields: ${invalidFields.join(', ')}`);
        }
        return true;
    }),
    validateRequest,
];

const validateListModuleActions = [
    query('page').optional().isInt({ min:1 }).withMessage('page must be a positive number'),

    query('limit').optional().isInt({ min:1, max:100 }).withMessage('limit must be between 1 and 100'),

    query('search').optional().isString().withMessage('search must be string').bail()
    .trim().isLength({ max:100 }).withMessage('search cannot exceed 100 characters'),

    query('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),

    query('sortBy').optional().isIn(['id','name','code','createdAt','updatedAt'])
    .withMessage('Invalid sortBy field'),

    query('sortOrder').optional().isIn(['ASC','DESC','asc','desc'])
    .withMessage('sortOrder must be ASC or DESC'),

    validateRequest,
];

module.exports = {
    validateModuleActionId,
    validateCreateModuleAction,
    validateUpdateModuleActions,
    validateListModuleActions
}