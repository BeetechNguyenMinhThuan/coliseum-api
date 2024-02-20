'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('rounds', {
      round_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ulid: {
        type: Sequelize.CHAR(16),
        allowNull: false
      },
      round_name: {
        type: Sequelize.STRING(128),
      },
      round_order: {
        type: Sequelize.INTEGER,
      },
      round_start_at: {
        type: Sequelize.DATE,
      },
      round_finish_at: {
        type: Sequelize.DATE,
      },
      vote_start_at: {
        type: Sequelize.DATE,
      },
      vote_finish_at: {
        type: Sequelize.DATE,
      },
      round_type: {
        type: Sequelize.TINYINT,
      },
      is_current: {
        type: Sequelize.BOOLEAN,
      },
      winner_count: {
        type: Sequelize.INTEGER,
      },
      min_word_count: {
        type: Sequelize.INTEGER,
      },
      max_word_count: {
        type: Sequelize.INTEGER,
      },
      tag: {
        type: Sequelize.STRING(40),
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
    await queryInterface.dropTable('rounds');

  }
};
