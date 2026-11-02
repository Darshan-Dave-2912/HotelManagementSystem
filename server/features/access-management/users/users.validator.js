const { body, query, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((error) => ({
                field: error.path,
                message: error.msg
            })),
        })
    }
    next();
}

const validateUserId = [
    param('id')
    .isUUID(7)
    .withMessage('User ID must be a uuidv7'),
    validateRequest,
];

const validateCreateUser = [
    body('roleId')
    .exists({ checkNull:true })
    .withMessage('Role ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive number')
    .bail()
    .toInt(),

    body('username')
    .exists({ checkNull: true })
    .withMessage('User Name is Required')
    .bail()
    .isString()
    .withMessage('User Name must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('User Name cannot be empty')
    .bail()
    .isLength({ min:3, max: 50 })
    .withMessage('User Name must be between 3 and 50 characters')
    .bail()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('User Name can only contain letters, numbers and underscores'),


    body('email')
    .exists({ checkNull: true })
    .withMessage('Email is required')
    .bail()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail() 
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Email cannot exceed 150 characters')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .bail()
    .toLowerCase(),

    body('phone')
    .exists({ checkNull: true })
    .withMessage('Phone number is required')
    .bail()
    .notEmpty()
    .withMessage('Phone number cannot be empty')
    .bail()
    .trim()
    .isLength({ max: 15 })
    .withMessage('Phone number cannot exceed 15 characters')
    .bail()
    .isMobilePhone('any')
    .withMessage('Must be a valid mobile phone number'),

    body('password')
    .exists({ checkNull: true })
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({ max:72 })
    .withMessage('Password cannot exceed 72 characters')
    .bail()
    .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        })
        .withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    validateRequest,
];

const validateUpdateUser = [

    param('id')
    .isUUID(7)
    .withMessage('User ID must be a valid UUIDv7'),

    body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive number')
    .bail()
    .toInt(),

    body('username')
    .optional()
    .isString()
    .withMessage('username must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .bail()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers and underscores'),

    body('email')
    .optional()
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isLength({ max: 150 })
    .withMessage('Email cannot exceed 150 characters')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address'),

    body('phone')
    .optional()
    .isString()
    .withMessage('Phone number must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Phone number cannot be empty')
    .bail()
    .isLength({ max: 15 })
    .withMessage('Phone number cannot exceed 15 characters')
    .bail()
    .isMobilePhone('any')
    .withMessage('Must be a valid mobile phone number'),

    body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    body().custom((value) => {
        const allowedFields = ['roleId', 'username', 'email', 'phone', 'isActive'];

        if(!value || typeof value !== 'object' || Array.isArray(value)){
            throw new Error('Provide at least one valid field for update');
        }

        const keys = Object.keys(value);

        if(keys.length === 0){
            throw new Error('Provide at least one field to update');
        }

        const invalidFields = keys.filter((key) => !allowedFields.includes(key));

        if(invalidFields.length > 0)
        {
            throw new Error(`Unsupported Fields: ${invalidFields.join(', ')}`);
        }

        return true;
    }),

    validateRequest,
];

const validateListUsers = [
    query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer'),

    query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be between 1 and 100'),

    query('search')
    .optional()
    .isString()
    .withMessage('search must be a string')
    .bail()
    .trim()
    .isLength({ max: 100 })
    .withMessage('search cannot exceed 100 characters'),

    query('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('roleId must be a positive integer'),

    query('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

    query('sortBy')
    .optional()
    .isIn(['username', 'email', 'phone', 'lastLoginAt', 'createdAt', 'updatedAt'])
    .withMessage('Invalid sortBy field'),

    query('sortOrder')
    .optional()
    .isIn(['ASC','DESC', 'asc', 'desc'])
    .withMessage('sortOrder must be ASC or DESC'),

    validateRequest,
];

module.exports = {
    validateUserId,
    validateCreateUser,
    validateUpdateUser,
    validateListUsers
};