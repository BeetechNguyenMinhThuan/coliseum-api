const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MatchNovel extends Model {
    }

    MatchNovel.init({
        match_id: {
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
        },
        result_type: {
            type: DataTypes.TINYINT,
        },
        is_post: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        sequelize,
        modelName: 'MatchNovel',
        tableName: 'match_novels',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

// Đồng bộ model với database
    return MatchNovel
}
