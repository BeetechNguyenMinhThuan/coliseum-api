"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contents", {
      content_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position_type: {
        type: Sequelize.TINYINT,
      },
      title: {
        type: Sequelize.STRING(256),
      },
      content_url: {
        type: Sequelize.STRING(2048),
      },
      destination_url: {
        type: Sequelize.STRING(2048),
      },
      information_type: {
        type: Sequelize.TINYINT,
        validate: {
          min: 1,
          max: 3,
        },
      },
      content: {
        type: Sequelize.TEXT,
      },
      sort_order: {
        type: Sequelize.TINYINT,
        validate: {
          min: 0,
          max: 100,
        },
      },
      publication_start_at: {
        type: Sequelize.DATE,
      },
      publication_finish_at: {
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
    await queryInterface.dropTable("contents");
  },
};
