const Role = require('./roles.model');
const User = require('./users.model');

// Associations
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

const db = {
    Role,
    User
};

module.exports = db; 