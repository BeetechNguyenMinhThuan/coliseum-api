'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let demoData = [];
    for (let i = 0; i < 300; i++) {
      demoData.push({
        round_id: `${i}`,
        match_uuid: `final`,
        match_name: `final`,
        winner_type: "3",
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('Matches', demoData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Match', null, {});
  }
};
