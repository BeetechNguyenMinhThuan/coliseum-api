'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('novels', {
      novel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      novel_ulid: {
        type: Sequelize.CHAR(16),
        allowNull: false,
        // autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(256),
      },
      synopsis: {
        type: Sequelize.TEXT,
      },
      cover_picture_url: {
        type: Sequelize.STRING(2048),
      },
      foreword_url: {
        type: Sequelize.STRING(2048),
      },
      afterword_url: {
        type: Sequelize.STRING(2048),
      },
      setting_url: {
        type: Sequelize.STRING(2048),
      },
      note_url: {
        type: Sequelize.STRING(2048),
      },
      dictionary_url: {
        type: Sequelize.STRING(2048),
      },
      is_anonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      is_publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false

      },
      is_ranking_visble: {
        type: Sequelize.BOOLEAN,
        defaultValue: true

      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false

      },
      is_comment: {
        type: Sequelize.BOOLEAN,
        defaultValue: true

      },
      is_comment_publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: true

      },
      first_novel_publish_at: {
        type: Sequelize.DATE,

      },
      first_name_publish_at: {
        type: Sequelize.DATE,
      },
      first_completed_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('novels');

  }
};
