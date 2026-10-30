const Role = require('./roles.model');
const Users = require('./users.model');

// Associations
roles.hasMany(users, { foreignKey: 'roleId' });
users.belongsTo(roles, { foreignKey: 'roleId' });

const db = {
    Role,
    Users
};

module.exports = db; 