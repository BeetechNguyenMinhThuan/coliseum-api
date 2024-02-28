"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("episodes", {
      episode_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      episode_ulid: {
        type: Sequelize.CHAR(16),
        allowNull: false,
      },
      episode_title: {
        type: Sequelize.STRING(256),
      },
      episode_type: {
        type: Sequelize.TINYINT,
      },
      novel_id: {
        type: Sequelize.INTEGER,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      episode_url: {
        type: Sequelize.STRING(2048),
      },
      is_publish: {
        type: Sequelize.BOOLEAN,
      },
      publish_at: {
        type: Sequelize.DATE,
      },
      first_novel_publish_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("episodes");
  },
};
