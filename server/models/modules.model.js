const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const modules = sequelize.define('modules',
    {
        id:{
            type:DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,   
        },
        code:{
            type:DataTypes.STRING(6),
            allowNull:false,
            unique:true
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        },
    },
    {
        tableName:'modules',
        underscored: true,
        timestamps: true,
        paranoid:true,
    }
);

module.exports = modules;