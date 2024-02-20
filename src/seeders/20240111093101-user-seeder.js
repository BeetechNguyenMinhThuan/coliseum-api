'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let demoData = [];
    for (let i = 0; i < 20; i++) {
      demoData.push({
        user_uuid: `${i}`,
        name: `nguoi ${i}`,
        s3_url: `final`,
        first_login_at: "2024-11-21",
        last_login_at: "2024-11-21",
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', demoData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
