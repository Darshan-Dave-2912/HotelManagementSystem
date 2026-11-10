const Role = require('./roles.model');
const User = require('./users.model');
const UserSession = require('./userSessions.model');
const Module = require('./modules.model');
const ModuleActions = require('./moduleActions.model');

// Associations
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(UserSession, { foreignKey: 'userId' });
UserSession.belongsTo(User, { foreignKey: 'userId' });

Module.hasMany(ModuleActions, { foreignKey: 'moduleId' });
ModuleActions.belongsTo(Module, { foreignKey:'moduleId' });

const db = {
    Role,
    User,
    UserSession,
    Module,
    ModuleActions
};

module.exports = db; 