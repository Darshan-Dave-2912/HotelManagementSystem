'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions',{
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      role_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        references:{
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      module_action_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'module_actions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      granted_by:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      revoked_by:{
        type: Sequelize.UUID,
        allowNull: true,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      granted_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      revoked_at:{
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addIndex('permissions', ['role_id', 'revoked_at'], {
      name: 'idx_permissions_role_revoked'
    });
    await queryInterface.addIndex('permissions', ['module_action_id'], {
      name: 'idx_permissions_module_action'
    });
    // Ek role + action ki sirf ek ACTIVE row ho sakti hai, revoked rows (history) unlimited
    await queryInterface.addIndex('permissions', ['role_id', 'module_action_id'], {
      name: 'uq_permissions_active_role_action',
      unique: true,
      where: { revoked_at: null }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('permissions');
  }
};