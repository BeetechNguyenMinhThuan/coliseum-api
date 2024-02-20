'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('match_novels', {
      match_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      novel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      vote_count: {
        type: Sequelize.INTEGER,
      },
      result_type: {
        type: Sequelize.TINYINT,
      },
      is_post: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('match_novels');

  }
};
