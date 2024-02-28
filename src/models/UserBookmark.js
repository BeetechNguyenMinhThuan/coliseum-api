const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserBookmark extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Novel, { foreignKey: "novel_id" });
    }
  }

  UserBookmark.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      novel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      read_at: {
        type: DataTypes.DATE,
      },
      episode_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "UserBookmark",
      tableName: "user_bookmarks",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  // Đồng bộ model với database
  return UserBookmark;
};
