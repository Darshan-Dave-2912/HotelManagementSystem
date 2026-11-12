const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { uuidv7 } = require('uuidv7');

const permissions = sequelize.define('permissions',
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv7()
        },
        roleId:{
            type: DataTypes.BIGINT,
            allowNull: false,
            references:{
                model: 'roles',
                key: 'id',
            }
        },
        moduleActionId:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: 'module_actions',
                key: 'id',
            }
        },
        grantedBy:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id',
            }
        },
        revokedBy:{
            type: DataTypes.UUID,
            allowNull: true,
            references:{
                model: 'users',
                key: 'id',
            }
        },
        grantedAt:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        revokedAt:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        tableName: 'permissions',
        underscored: true,
        timestamps: false,
        paranoid: false,
    }
);

module.exports = permissions;