"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("official_tags", {
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_ulid: {
        type: Sequelize.CHAR(16),
      },
      tag: {
        type: Sequelize.STRING(40),
      },
      font_color: {
        type: Sequelize.STRING(6),
      },
      background_color: {
        type: Sequelize.STRING(6),
      },
      start_at: {
        type: Sequelize.DATE,
      },
      finish_at: {
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
    await queryInterface.dropTable("official_tags");
  },
};
