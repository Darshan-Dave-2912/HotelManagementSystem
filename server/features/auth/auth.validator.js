const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
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

const validateLogin = [
    body('identifier')
    .exists({ checkNull: true })
    .withMessage('Email or username is required')
    .bail()
    .isString()
    .withMessage('Email or username must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Email or username cannot be empty')
    .bail()
    .isLength({ max: 150 })
    .withMessage('Email or username cannot exceed 150 characteras'),

    body('password')
    .exists({ checkNull: true })
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password cannot be empty')
    .bail()
    .isLength({ max: 72 })
    .withMessage('Password cannot exceed 72 characters'),

    validateRequest,
];

module.exports = {
    validateLogin,
};