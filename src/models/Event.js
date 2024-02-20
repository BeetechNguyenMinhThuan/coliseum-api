const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {

    class Event extends Model {
        static associate({Novel}) {
            this.belongsToMany(Novel, {through: 'EventParticipant', foreignKey: 'event_id',as: 'eventParticipants'});
        }
    }

    Event.init({
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_ulid: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        event_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        tag_id: {
            type: DataTypes.INTEGER,
        },
        s3_url: {
            type: DataTypes.STRING(2048),
        },
        event_1_url: {
            type: DataTypes.STRING(2048),
        },
        event_2_url: {
            type: DataTypes.STRING(2048),
        },
        event_3_url: {
            type: DataTypes.STRING(2048),
        },
        event_4_url: {
            type: DataTypes.STRING(2048),
        },
        event_5_url: {
            type: DataTypes.STRING(2048),
        },
        event_type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2, 3]],
                    msg: "Giá trị phải là 1, 2, hoặc 3"
                }
            }
        },
        is_anonymous: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        is_multiple: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_comment: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        is_comment_publish: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        min_participants: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        max_participants: {
            type: DataTypes.INTEGER,
        },
        decision_type: {
            type: DataTypes.TINYINT,
        },
        registration_start_at: {
            type: DataTypes.DATE,

        },
        registration_finish_at: {
            type: DataTypes.DATE,

        },
        event_start_at: {
            type: DataTypes.DATE,

        },
        event_finish_at: {
            type: DataTypes.DATE,

        },
        event_content: {
            type: DataTypes.TEXT,
        },
        event_lp_url: {
            type: DataTypes.STRING(2048),
        },
        current_round_id: {
            type: DataTypes.INTEGER,
        },
        current_round_name: {
            type: DataTypes.STRING(128),
        },
        current_round_order: {
            type: DataTypes.INTEGER,
        },
        max_round_order: {
            type: DataTypes.INTEGER,
        },

    }, {
        sequelize,
        modelName: 'Event',
        tableName: 'events',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return Event
}
