'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('templates', {
      create_user_id: {
        type: Sequelize.INTEGER,
      },
      create_system_type: {
        type: Sequelize.SMALLINT,
      },
      update_user_id: {
        type: Sequelize.INTEGER,
      },
      update_system_type: {
        type: Sequelize.SMALLINT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('templates');

  }
};
