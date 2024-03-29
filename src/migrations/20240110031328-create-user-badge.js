'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_badges', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      badges_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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

    await queryInterface.dropTable('user_badges');

  }
};
