'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('episodes', {
            episode_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            episode_ulid: {
                type: Sequelize.CHAR(16),
                allowNull: false,
                // autoIncrement: true
            },
            episode_title: {
                type: Sequelize.STRING(256),
            },
            episode_type: {
                type: Sequelize.TINYINT,
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
                type: Sequelize.STRING(2048),
            },
            first_novel_publish_at: {
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('episodes');

    }
};
