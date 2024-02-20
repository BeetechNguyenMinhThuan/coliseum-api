const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NovelBadge extends Model {
        static associate(models) {
            this.belongsTo(models.Novel, { foreignKey: 'novel_id', as: 'novel' });
            this.belongsTo(models.OfficialBadge, { foreignKey: 'badges_id', as: 'badge' });
        }
    }

    NovelBadge.init({
        novel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        badges_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'NovelBadge',
        tableName: 'novel_badges',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return NovelBadge
}
