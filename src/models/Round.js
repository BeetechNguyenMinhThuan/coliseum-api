const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Round extends Model {}

  Round.init(
    {
      round_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ulid: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      round_name: {
        type: DataTypes.STRING(128),
      },
      round_order: {
        type: DataTypes.INTEGER,
      },
      round_start_at: {
        type: DataTypes.DATE,
      },
      round_finish_at: {
        type: DataTypes.DATE,
      },
      vote_start_at: {
        type: DataTypes.DATE,
      },
      vote_finish_at: {
        type: DataTypes.DATE,
      },
      round_type: {
        type: DataTypes.TINYINT,
      },
      is_current: {
        type: DataTypes.BOOLEAN,
      },
      winner_count: {
        type: DataTypes.INTEGER,
      },
      min_word_count: {
        type: DataTypes.INTEGER,
      },
      max_word_count: {
        type: DataTypes.INTEGER,
      },
      tag: {
        type: DataTypes.STRING(40),
      },
    },
    {
      sequelize,
      modelName: "Round",
      tableName: "rounds",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Round;
};
