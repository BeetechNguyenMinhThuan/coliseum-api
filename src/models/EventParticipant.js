const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class EventParticipant extends Model {
        static associate(models) {
            this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
            this.belongsTo(models.Novel, { foreignKey: 'novel_id', as: 'novel' });
        }
    }

    EventParticipant.init({
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        novel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'EventParticipant',
        tableName: 'event_participants',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return EventParticipant
}
