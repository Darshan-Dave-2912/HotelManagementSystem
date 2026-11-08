'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('modules',{
      id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      name:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true,
      },
      code:{
        type:DataTypes.STRING(3),
        allowNull:false,
        unique:true,
      },
      is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },
      created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
      },
      updated_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
      },
      deleted_at:{
        type:DataTypes.DATE,
        allowNull:true
      },
    });
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('modules');
  }
};
