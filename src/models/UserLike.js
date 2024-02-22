"use strict";
const { Model } = require("sequelize");
const User = require("./User");
const Novel = require("./Novel");
module.exports = (sequelize, DataTypes) => {
  class UserLike extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Novel, { foreignKey: "novel_id" });
    }
  }

  UserLike.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      novel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "UserLike",
      tableName: "user_likes",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return UserLike;
};
