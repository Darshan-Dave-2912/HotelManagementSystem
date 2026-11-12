// Single source of truth: Postman se modules/actions bante waqt yehi codes use karna
// (agar alag codes rakhne hain to sirf yahan badalna)

const MODULE_CODES = {
    ROLES: 'ROLE',
    USERS: 'USER',
    MODULES: 'MODULE',
    MODULE_ACTIONS: 'MODACT',
    PERMISSIONS: 'PERM',
};

const ACTION_CODES = {
    VIEW: 'VIEW',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GRANT: 'GRANT',
    REVOKE: 'REVOKE',
};

// Lockout guard in actions ko "permission-management access" maanta hai
const PERMISSION_MANAGEMENT_ACTIONS = [ACTION_CODES.GRANT, ACTION_CODES.REVOKE];

module.exports = {
    MODULE_CODES,
    ACTION_CODES,
    PERMISSION_MANAGEMENT_ACTIONS,
};