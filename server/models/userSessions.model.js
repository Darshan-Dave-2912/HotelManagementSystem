const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { uuidv7 } = require('uuidv7');

const userSessions = sequelize.define('userSessions',
    {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue: () => uuidv7()
        },
        userId:{
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:'users',
                key:'id'
            }
        },
        ipAddress:{
        type:DataTypes.STRING(45),
        allowNull:true
        },
        refreshTokenHash:{
            type:DataTypes.STRING(255),
            allowNull:false,
            unique:true
        },
        expiresAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        revokedAt:{
            type:DataTypes.DATE,
            allowNull:true,
            defaultValue:null
        }
    },
    {
        tableName:'user_sessions',
        underscored:true,
        timestamps:true,
        paranoid:false,
    }
);
module.exports = userSessions;