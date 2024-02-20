const {DataTypes, Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserBadge extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            this.belongsTo(models.OfficialBadge, { foreignKey: 'badges_id', as: 'official_badges' });
        }
    }

    UserBadge.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        badges_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'UserBadge',
        tableName: 'user_badges',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });

    return UserBadge
}
