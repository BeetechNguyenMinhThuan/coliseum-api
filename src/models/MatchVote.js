const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MatchVote extends Model {
    }

    MatchVote.init({
        match_vote_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        novel_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vote_count: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_titling: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false

        },
    }, {
        sequelize,
        modelName: 'MatchVote',
        tableName: 'match_votes',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return MatchVote
}
