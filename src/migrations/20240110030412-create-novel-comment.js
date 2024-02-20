'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('novel_comments', {
      novel_comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      novel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      episode_id: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING(2048),
      },
      score: {
        type: Sequelize.INTEGER,
      },
      is_official_allow: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      response_comment_id: {
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
    await queryInterface.dropTable('novel_comments');

  }
};
