const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const roles = sequelize.define('roles',
    {
        id:{
            type: DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        code:{
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        
    },
    {
        tableName: 'roles',
        underscored: true,
        timestamps: true,
        paranoid: true,
    }
);

module.exports = roles;