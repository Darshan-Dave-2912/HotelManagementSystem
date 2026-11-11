'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_sessions', 'previous_refresh_token_hash', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('user_sessions', 'last_active_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('user_sessions', 'user_agent', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn('user_sessions', 'revoked_by', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('user_sessions', 'revoke_reason', {
      type: Sequelize.STRING(30),
      allowNull: true,
    });

    await queryInterface.addIndex('user_sessions', ['previous_refresh_token_hash'], {
      name: 'idx_user_sessions_previous_refresh_token_hash',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('user_sessions', 'idx_user_sessions_previous_refresh_token_hash');
    await queryInterface.removeColumn('user_sessions', 'revoke_reason');
    await queryInterface.removeColumn('user_sessions', 'revoked_by');
    await queryInterface.removeColumn('user_sessions', 'user_agent');
    await queryInterface.removeColumn('user_sessions', 'last_active_at');
    await queryInterface.removeColumn('user_sessions', 'previous_refresh_token_hash');
  },
};