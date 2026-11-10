'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('module_actions',{
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull:false
      },
      module_id:{
        type:Sequelize.BIGINT,
        allowNull:false,
        references:{
          model: 'modules',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      name:{
        type: Sequelize.STRING(30),
        allowNull:false,
      },
      code:{
        type:Sequelize.STRING(6),
        allowNull:false,
      },
      is_active:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updated_at: {
            type: Sequelize.DATE,
          allowNull: false
      },
      deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
      }
    });
    await queryInterface.addIndex('module_actions', ['module_id']);
  },

  async down (queryInterface) {
    await queryInterface.dropTable('module_actions');
  }
};
