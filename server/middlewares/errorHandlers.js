const { UniqueConstraintError, ForeignKeyConstraintError, ValidationError } = require('sequelize');
const AppError = require('../utils/AppError');


const notFoundErrors = (req, res, next) => {
    next(new AppError(`Route not found, ${req.method} ${req.originalUrl}`, 404));
}

const errorHandler = (err, req, res, next) => {
    if(res.headersSent) return next(err);

let statusCode = err.statusCode || 500;
let message = err.message || 'Internal server error';
let errors;

if(err instanceof UniqueConstraintError){
    statusCode = 409;
    message = 'Duplicate value';
    errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
}
else if (err instanceof ForeignKeyConstraintError){ 
    statusCode = 400; 
    message = 'Invalid reference to a related record'; 
}

else if (err instanceof ValidationError){
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
}
else if (err.type === 'entity.parse.failed'){
    statusCode = 400;
     message = 'Invalid JSON in request body';
}

const isProduction = process.env.NODE_ENV === 'production';

if(statusCode >= 500){
    console.error(err); 
    if(isProduction) message = 'Internal server error';
} 

console.error({
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message: err.message,
    ip: req.ip,
    timestamp: new Date().toISOString(),
    stack: err.stack,
});

return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(!isProduction && statusCode >= 500 && { stack: err.stack }),
});
}




module.exports = { notFoundErrors, errorHandler };