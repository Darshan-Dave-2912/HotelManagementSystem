const { body, query, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            sucess:false,
            message:'Validation failed',
            errors: errors.array().map((error) => ({
                field: error.path,
                message: error.msg,
            })),
        });
    }
    next();
}

const validateModuleId = [
    param('id').isInt({ min: 1 }).withMessage('Module ID must be a positive number').bail().toInt(),
    validateRequest,
];

const validateCreateModule = [
    body('name')
    .exists({ checkNull: true })
    .withMessage('Module name is required')
    .bail()
    .isString()
    .withMessage('Module name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module name cannot be empty')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Role name cannot exceed 30 characters'),

    body('code')
    .exists({ checkNull: true })
    .withMessage('Module code is required')
    .bail()
    .isString()
    .withMessage('code must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module code cannot be empty')
    .bail()
    .isLength({ max: 6 })
    .withMessage('Module code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Module code can only contain letters, number and underscores'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    validateRequest
];

const validateUpdateModule = [
    param('id')
    .isInt({ min: 1 })
    .withMessage('Module ID must be a positive number')
    .bail()
    .toInt(),

    body('name')
    .optional()
    .isString()
    .withMessage('Module must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Module name cannot be empty')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Module name cannot exceed 30 characters'),

    body('code')
    .optional()
    .isString()
    .withMessage('Module code must be a string')
    .bail()
    .trim()
    .withMessage('Module code cannot be empty')
    .bail()
    .isLength({ max: 6 })
    .withMessage('Module code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Module code can contain letters, numbers and underscores'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    body().custom((value) => {
        const allowedFields = ['name','code','isActive'];

        if(!value || typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).some((key) => allowedFields.includes(key)))
        {
            throw new Error('Provide at lease one valid field for update');
        }

        const key = Object.key(value);
        if(!key.some((key) => allowedFields.includes(key))){
            throw new Error('Provide at least one field to update')
        };

        const invalidFields = key.filter(
            (key) => !allowedFields.includes(key)
        );

        if(invalidFields.isLength > 0)
        {
            throw new Error(`Unsupported Fields: ${invalidFields.join(', ')}`);
        }
        return true;
    }),
    validateRequest,
];

const validateListModules = [
    query('page').optional().isInt({ min:1 }).withMessage('page must be a positive integer'),
    
    query('limit').optional().isInt({ min:1, max:100 }).withMessage('limit must be between 1 and 100'),
    
    query('search').optional().isString().withMessage('search must be string').bail()
    .trim().isLength({ max:100 }).withMessage('search canot exceed 100 characters'),

    query('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),

    query('sortBy').optional().isIn(['ASC','DESC','asc','desc']).withMessage('sortOrder must be ASC or DESC'),

    validateRequest,
];

module.exports = {
    validateModuleId,
    validateCreateModule,
    validateUpdateModule,
    validateListModules
}