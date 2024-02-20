'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('official_badges', {
      badges_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      badges_ulid: {
        type: Sequelize.CHAR(16),
      },
      badges_name: {
        type: Sequelize.STRING(20),
      },
      badges_url: {
        type: Sequelize.STRING(2048),
      },
      start_at: {
        type: Sequelize.DATE
      },
      finish_at: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('official_badges');

  }
};
