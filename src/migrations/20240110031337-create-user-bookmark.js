"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_bookmarks", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      novel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      read_at: {
        type: Sequelize.DATE,
      },
      episode_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("user_bookmarks");
  },
};
