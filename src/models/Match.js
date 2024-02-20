const {DataTypes, Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
    }

    Match.init({
        match_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        round_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        match_uuid: {
            type: DataTypes.STRING(16),
        },
        match_name: {
            type: DataTypes.STRING(128),
        },
        vote_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        winner_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        winner_type: {
            type: DataTypes.INTEGER,
        }
    }, {
        sequelize,
        modelName: 'Match',
        tableName: 'matches',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return Match;
}
