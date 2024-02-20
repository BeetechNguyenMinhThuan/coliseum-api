const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class OfficialTag extends Model {
        static associate({Novel}) {
            this.belongsToMany(Novel, {through: 'NovelTag', foreignKey: 'tag_id' });
        }
    }

    OfficialTag.init({
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag_ulid: {
            type: DataTypes.STRING(16),
        },
        tag: {
            type: DataTypes.STRING(40),
        },
        start_at: {
            type: DataTypes.DATE
        },
        finish_at: {
            type: DataTypes.DATE
        },
    }, {
        sequelize,
        modelName: 'OfficialTag',
        tableName: 'official_tags',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return OfficialTag
}
