const Role = require('./roles.model');
const User = require('./users.model');
const UserSession = require('./userSessions.model');
const Module = require('./modules.model');
const ModuleActions = require('./moduleActions.model');
const permissions = require('./permission.model');

// Associations
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(UserSession, { foreignKey: 'userId' });
UserSession.belongsTo(User, { foreignKey: 'userId' });

Module.hasMany(ModuleActions, { foreignKey: 'moduleId' });
ModuleActions.belongsTo(Module, { foreignKey:'moduleId' });

Role.hasMany(permissions, { foreignKey: 'roleId' });
permissions.belongsTo(Role, { foreignKey: 'roleId' });

ModuleActions.hasMany(permissions, { foreignKey: 'moduleActionId' });
permissions.belongsTo(ModuleActions, { foreignKey: 'moduleActionId', as: 'moduleAction' });

User.hasMany(permissions, { foreignKey: 'grantedBy', as: 'grantedPermissions' });
permissions.belongsTo(User, { foreignKey: 'grantedBy', as: 'grantedByUser' });
User.hasMany(permissions, { foreignKey: 'revokedBy', as: 'revokedPermissions' });
permissions.belongsTo(User, { foreignKey: 'revokedBy', as: 'revokedByUser' });

const db = {
    Role,
    User,
    UserSession,
    Module,
    ModuleActions,
    permissions
};

module.exports = db; 