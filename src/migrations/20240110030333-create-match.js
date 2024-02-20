'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      match_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      round_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      match_uuid: {
        type: Sequelize.CHAR(16),
      },
      match_name: {
        type: Sequelize.STRING(128),
      },
      vote_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      winner_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      winner_type: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');

  }
};
