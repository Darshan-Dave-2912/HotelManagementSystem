const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { uuidv7 } = require('uuidv7');

const users = sequelize.define('users',
    {
        id:{
            type:DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv7()
        },
        roleId:{
            type:DataTypes.BIGINT,
            allowNull:false,
            references:{
                model:'roles',
                key:'id'
            }
        },
        userName:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true
        },
        email:{
            type:DataTypes.STRING(150),
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        phone:{
            type:DataTypes.STRING(15),
            allowNull:false,
            unique:true
        },
        passwordHash:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        lastLoginAt:{
            type:DataTypes.DATE,
            allowNull:true
        }
    },
    {
        tableName:'users',
        underscored:true,
        timestamps:true,
        paranoid:true,
    }
);

module.exports = users;