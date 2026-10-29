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

const validateRoleId = [
    param('id').isInt({ min: 1 }).withMessage('Role ID must be a positive number').bail().toInt(),
    validateRequest,
];

const validateCreateRole = [
    body('name')
    .exists({ checkNull: true })
    .withMessage('Role name is required')
    .bail()
    .isString()
    .withMessage('Role name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Role name cannot be empty')
    .bail()
    .isLength({ max: 30})
    .withMessage('Role name cannot exceed 30 characters'),

    body('code')
    .exists({ checkNull: true })
    .withMessage('Role code is required')
    .bail()
    .isString()
    .withMessage('Code must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Role code cannot be empty')
    .bail()
    .isLength({ max: 6})
    .withMessage('Role code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Role code can only contain letters, numbers and underscores'),

    body('description')
    .optional({nullable: true})
    .isString()
    .trim()
    .withMessage('Description must be a string')
    .bail()
    .isLength({max: 2000})
    .withMessage('Description cannot exceed 2000 characters'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    validateRequest,
];

const validateUpdateRole = [
   param('id')
   .isInt({ min: 1 })
   .withMessage('Role ID must be a positive number')
   .bail()
   .toInt(),

    body('name')
    .optional()
    .isString()
    .withMessage('Role must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Role name cannot be empty')
    .bail()
    .isLength({ max: 30})
    .withMessage('Role name cannot exceed 30 characters'),

    body('code')
    .optional()
    .isString()
    .withMessage('Code must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Role code cannot be empty')
    .bail()
    .isLength({ max: 6})
    .withMessage('Role code cannot exceed 6 characters')
    .bail()
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Role code can contain letters, numbers and underscores'),

    body('description')
    .optional({nullable: true})
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({max: 2000})
    .withMessage('Description cannot exceed 2000 characters'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),


    body().custom((value) => {
        const allowedFields = ['name', 'code', 'description','isActive'];

        if(!value || typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).some((key) => allowedFields.includes(key)))
        {
            throw new Error('Provide at least one valid field for update');
        }

        const key = Object.keys(value);
        if(!key.some((key) => allowedFields.includes(key))){
            throw new Error('Provide at least one field to update')
        };

        const invalidFields = key.filter(
            (key) => !allowedFields.includes(key)
        );

        if(invalidFields.length > 0)
        {
            throw new Error (`Unsupported Fields: ${invalidFields.join(', ')}`);
        }

        return true;
    }),

    validateRequest,
];

const validateListRoles = [
    query('page').optional().isInt({ min:1 }).withMessage('page must be a positive integer'),

    query('limit').optional().isInt( {min:1, max:100}).withMessage('limit must be between 1 and 100'),

    query('search').optional().isString().withMessage('search must be string').bail()
    .trim().isLength({max: 100}).withMessage('search cannot exceed 100 characters'),

    query('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),

    query('sortBy').optional().isIn(['id','name','code','createdAt','updatedAt']).withMessage('Invalid sortBy field'),

    query('sortOrder').optional().isIn(['ASC','DESC','asc','desc']).withMessage('sortOrder must be ASC or DESC'),

    validateRequest,
];

module.exports = {
    validateRoleId,
    validateCreateRole,
    validateUpdateRole,
    validateListRoles
}