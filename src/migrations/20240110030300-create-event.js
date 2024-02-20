'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('events', {
            event_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            event_ulid: {
                type: Sequelize.CHAR(16),
                allowNull: false,
            },
            event_name: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            tag_id: {
                type: Sequelize.INTEGER,
            },
            s3_url: {
                type: Sequelize.STRING(2048),
            },
            event_1_url: {
                type: Sequelize.STRING(2048),
            },
            event_2_url: {
                type: Sequelize.STRING(2048),
            },
            event_3_url: {
                type: Sequelize.STRING(2048),
            },
            event_4_url: {
                type: Sequelize.STRING(2048),
            },
            event_5_url: {
                type: Sequelize.STRING(2048),
            },
            event_type: {
                type: Sequelize.TINYINT,
                allowNull: false,
            },
            is_anonymous: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            is_multiple: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            is_comment: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            is_comment_publish: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            min_participants: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            max_participants: {
                type: Sequelize.INTEGER,
            },
            decision_type: {
                type: Sequelize.TINYINT,
            },
            registration_start_at: {
                type: Sequelize.DATE,

            },
            registration_finish_at: {
                type: Sequelize.DATE,

            },
            event_start_at: {
                type: Sequelize.DATE,

            },
            event_finish_at: {
                type: Sequelize.DATE,

            },
            event_content: {
                type: Sequelize.TEXT,
            },
            event_lp_url: {
                type: Sequelize.STRING(2048),
            },
            current_round_id: {
                type: Sequelize.INTEGER,
            },
            current_round_name: {
                type: Sequelize.STRING(128),
            },
            current_round_order: {
                type: Sequelize.INTEGER,
            },
            max_round_order: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('events');

    }
};
