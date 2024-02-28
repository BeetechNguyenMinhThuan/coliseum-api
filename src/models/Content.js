"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      // define association here
    }
  }
  Content.init(
    {
      content_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position_type: {
        type: DataTypes.TINYINT,
      },
      title: {
        type: DataTypes.STRING(256),
      },
      content_url: {
        type: DataTypes.STRING(2048),
      },
      destination_url: {
        type: DataTypes.STRING(2048),
      },
      information_type: {
        type: DataTypes.TINYINT,
      },
      content: {
        type: DataTypes.TEXT,
      },
      sort_order: {
        type: DataTypes.TINYINT,
      },
      publication_start_at: {
        type: DataTypes.DATE,
      },
      publication_finish_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Content",
      tableName: "contents",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Content;
};
