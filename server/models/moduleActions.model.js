const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { uuidv7 } = require('uuidv7');

const moduleActions = sequelize.define('moduleActions',
    {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue: () => uuidv7()
        },
        moduleId:{
            type: DataTypes.BIGINT,
            allowNull:false,
            references:{
                model:'modules',
                key:'id',
            }
        },
        name:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        code:{
            type:DataTypes.STRING(6),
            allowNull:false,
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true,
        }
    },
    {
        tableName:'module_actions',
        underscored:true,
        timestamps:true,
        paranoid:true,
    }
);
module.exports = moduleActions;