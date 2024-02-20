'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('event_participants', {
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      novel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false

      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('event_participants');

  }
};
