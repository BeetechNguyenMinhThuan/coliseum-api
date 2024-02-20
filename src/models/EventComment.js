const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EventComment extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user' });
        }
    }

    EventComment.init({
        event_comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(2048),
        },
        score: {
            type: DataTypes.INTEGER,
        },
        is_official_allow: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        response_comment_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'EventComment',
        tableName: 'event_comments',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return EventComment
}
