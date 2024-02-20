const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserBookmark extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            this.belongsTo(models.Novel, { foreignKey: 'novel_id', as: 'novel' });
        }
    }

    UserBookmark.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        novel_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'UserBookmark',
        tableName: 'user_bookmarks',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

// Đồng bộ model với database
    return UserBookmark
}
