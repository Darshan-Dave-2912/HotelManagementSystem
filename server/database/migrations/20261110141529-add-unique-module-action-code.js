'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addIndex('module_actions', ['module_id', 'code'], {
      unique: true,
      where: { deleted_at: null },
      name: 'module_actions_module_id_code_unique'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeIndex('module_actions', 'module_actions_module_id_code_unique');
  }
};