const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    static associate({
      User,
      Event,
      OfficialTag,
      OfficialBadge,
      NovelComment,
      Episode,
    }) {
      this.belongsToMany(User, {
        through: "UserLike",
        foreignKey: "novel_id",
        as: "userLikeNovels",
      });
      this.belongsToMany(User, {
        through: "UserBookmark",
        foreignKey: "novel_id",
        as: "userBookmarkNovels",
      });
      this.belongsToMany(Event, {
        through: "EventParticipant",
        foreignKey: "novel_id",
        as: "eventParticipants",
      });
      this.belongsToMany(OfficialTag, {
        through: "NovelTag",
        foreignKey: "novel_id",
        as: "novelTags",
      });
      this.belongsToMany(OfficialBadge, {
        through: "NovelBadge",
        foreignKey: "novel_id",
        as: "novelBadges",
      });
      this.hasMany(NovelComment, {
        foreignKey: "novel_id",
        as: "novelComments",
      });
      this.hasMany(Episode, { foreignKey: "novel_id", as: "episodes" });

      this.belongsTo(User, { foreignKey: "user_id", as: "Users" });
    }
  }

  Novel.init(
    {
      novel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      novel_ulid: {
        type: DataTypes.STRING(16),
        allowNull: false,
        // autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(256),
      },
      author: {
        type: DataTypes.STRING(128),
      },
      synopsis: {
        type: DataTypes.TEXT,
      },
      badges_id: {
        type: DataTypes.INTEGER,
      },
      cover_picture_url: {
        type: DataTypes.STRING(2048),
      },
      foreword_url: {
        type: DataTypes.STRING(2048),
      },
      afterword_url: {
        type: DataTypes.STRING(2048),
      },
      setting_url: {
        type: DataTypes.STRING(2048),
      },
      note_url: {
        type: DataTypes.STRING(2048),
      },
      dictionary_url: {
        type: DataTypes.STRING(2048),
      },
      is_anonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      is_publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_ranking_visble: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_comment_publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      first_novel_publish_at: {
        type: DataTypes.DATE,
      },
      first_name_publish_at: {
        type: DataTypes.DATE,
      },
      first_completed_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Novel",
      tableName: "novels",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Novel;
};
