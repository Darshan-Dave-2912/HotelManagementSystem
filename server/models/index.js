const Role = require('./roles.model');
const User = require('./users.model');
const UserSession = require('./userSessions.model');
const Module = require('./modules.model');

// Associations
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(UserSession, { foreignKey: 'userId' });
UserSession.belongsTo(User, { foreignKey: 'userId' });

const db = {
    Role,
    User,
    UserSession,
    Module
};

module.exports = db; 