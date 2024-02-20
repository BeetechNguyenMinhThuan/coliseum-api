const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Episode extends Model {
    }

    Episode.init({
        episode_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        episode_ulid: {
            type: DataTypes.STRING(16),
            allowNull: false,
            // autoIncrement: true
        },
        episode_title: {
            type: DataTypes.STRING(256),
        },
        episode_type: {
            type: DataTypes.TINYINT
        },
        order: {
            type: DataTypes.INTEGER,
        },
        episode_url: {
            type: DataTypes.STRING(2048),
        },
        is_publish: {
            type: DataTypes.BOOLEAN,
        },
        publish_at: {
            type: DataTypes.STRING(2048),
        },
        first_novel_publish_at: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Episode',
        tableName: 'episodes',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return Episode
}
