const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NovelComment extends Model {
        static associate(models) {
            this.belongsTo(models.Novel, { foreignKey: 'novel_id' });
        }
    }

    NovelComment.init({
        novel_comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        novel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        episode_id: {
            type: DataTypes.INTEGER,
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
        is_publish: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        response_comment_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'NovelComment',
        tableName: 'novel_comments',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return NovelComment
}
