'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('match_votes', {
      match_vote_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      novel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      vote_count: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      is_titling: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('match_votes');

  }
};
