const AppError = require('../utils/AppError');
const { ACTION_CODES } = require('../config/accessControl.config');
const { getRolePermissionCodes } = require('../features/access-management/permissions/permissionCache.service');

const FORBIDDEN_MESSAGE = 'You do not have permission to perform this action';

const toKey = (moduleCode, actionCode) =>
    `${String(moduleCode).toUpperCase()}:${String(actionCode).toUpperCase()}`;

// authenticate ke BAAD lagta hai. req.user har request pe DB se aata hai,
// isliye role change hote hi naya role apply hota hai (JWT me roleId nahi hai)
const authorize = (moduleCode, actionCode) => async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError('Authentication required', 401);
        }

        if (!req.user.roleId) {
            throw new AppError(FORBIDDEN_MESSAGE, 403);
        }

        const codes = await getRolePermissionCodes(req.user.roleId);

        if (!codes.includes(toKey(moduleCode, actionCode))) {
            throw new AppError(FORBIDDEN_MESSAGE, 403);
        }

        next();
    } catch (error) {
        // Verification fail hui to access nahi milega (error handler 4xx/5xx dega)
        next(error);
    }
};

const METHOD_ACTION_MAP = {
    GET: ACTION_CODES.VIEW,
    HEAD: ACTION_CODES.VIEW,
    POST: ACTION_CODES.CREATE,
    PUT: ACTION_CODES.UPDATE,
    PATCH: ACTION_CODES.UPDATE,
    DELETE: ACTION_CODES.DELETE,
};

// Poore resource router pe ek baar lagane ke liye: HTTP method se action nikalta hai
const authorizeResource = (moduleCode) => (req, res, next) => {
    const actionCode = METHOD_ACTION_MAP[req.method];

    if (!actionCode) {
        return next(new AppError('Method not allowed', 405));
    }

    return authorize(moduleCode, actionCode)(req, res, next);
};

module.exports = {
    authorize,
    authorizeResource,
};