'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            // Cognito userid
            user_uuid: {
                type: Sequelize.STRING(128),
                allowNull: false
            },

            // Cognito Name
            name: {
                type: Sequelize.STRING(128),
                allowNull: false

            },
            s3_url: {
                type: Sequelize.STRING(2048),
                allowNull: false

            },
            first_login_at: {
                type: Sequelize.DATE,
                allowNull: false

            },
            last_login_at: {
                type: Sequelize.DATE,
                allowNull: false
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};
