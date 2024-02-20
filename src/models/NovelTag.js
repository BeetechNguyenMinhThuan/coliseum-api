const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NovelTag extends Model {
        static associate(models) {
            this.belongsTo(models.Novel, { foreignKey: 'novel_id', as: 'novel' });
            this.belongsTo(models.OfficialTag, { foreignKey: 'tag_id', as: 'tags' });
        }
    }

    NovelTag.init({
        novel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        tag_id: {
            type: DataTypes.STRING(40),
            primaryKey: true,
        },

    }, {
        sequelize,
        modelName: 'NovelTag',
        tableName: 'novel_tags',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return NovelTag
}
