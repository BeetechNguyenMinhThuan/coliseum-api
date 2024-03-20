const { GraphQLError } = require("graphql");
const {
  Novel,
  UserLike,
  User,
  Episode,
  sequelize,
  OfficialTag,
  NovelTag,
} = require("../models");
const { Op } = require("sequelize");
const { subHours, subDays, format, startOfDay } = require("date-fns");
const moment = require("moment");
class NovelService {
  static async get(args) {
    try {
      const { search } = args;
      console.log(search);
      const rounds = await Round.findAll({
        where: {
          round_name: {
            [Op.like]: `%${search ?? ""}%`,
          },
        },
      });
      return rounds;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
  static async getTimeFilter(type) {
    let startOfDay,
      endOfDay = "";
    switch (type) {
      case "daily":
        startOfDay = moment(new Date(), "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        endOfDay = moment(new Date(), "days")
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        break;
      case "weekly":
        startOfDay = moment().subtract(7, "days").startOf("day");
        endOfDay = new Date();
        break;
      case "monthly":
        startOfDay = moment().subtract(30, "days").startOf("day");
        endOfDay = new Date();
        break;
      case "quarterly":
        startOfDay = moment().subtract(90, "days").startOf("day");
        endOfDay = new Date();
        break;
      case "yearly":
        startOfDay = moment().subtract(365, "days").startOf("day");
        endOfDay = new Date();
        break;
      case "cumulative":
        startOfDay = "";
        endOfDay = "";
        break;
      default:
        break;
    }
    return { startOfDay, endOfDay };
  }

  static async getFilterNovelByLatest(page, limit, whereCondition) {
    const offset = (page - 1) * limit;
    const { count, rows: episodes } = await Episode.findAndCountAll({
      attributes: ["novel_id", "publish_at", "order"],
      include: [
        {
          model: Novel,
          as: "Novels",
          attributes: [
            "novel_ulid",
            "novel_id",
            "is_completed",
            "title",
            "synopsis",
            "first_novel_publish_at",
            "cover_picture_url",
            "author",
            [
              sequelize.literal(
                "(SELECT publish_at FROM episodes WHERE episodes.novel_id = Novels.novel_id AND episodes.`order` = 1)"
              ),
              "max_updated_at",
            ],
          ],
          where: {
            ...whereCondition,
            is_publish: 1,
          },
          required: true,
          include: [
            {
              model: User,
              as: "Users",
            },
          ],
        },
      ],
      where: {
        order: sequelize.literal(
          "`order`= (SELECT max(`order`) FROM episodes AS max_episode WHERE max_episode.novel_id = Episode.novel_id)"
        ),
      },
      order: [["publish_at", "DESC"]],
      limit,
      offset,
    });

    const novelsNew = episodes.map((episode) => ({
      novel_ulid: episode.Novels.novel_ulid,
      title: episode.Novels.title,
      novel_id: episode.Novels.novel_id,
      synopsis: episode.Novels.synopsis,
      cover_picture_url: episode.Novels.cover_picture_url,
      is_completed: episode.Novels.is_completed,
      author: episode.Novels.author,
      user_uuid: episode.Novels.Users.user_uuid,
      first_novel_publish_at: format(
        new Date(episode.Novels.first_novel_publish_at),
        "yyyy-MM-dd HH:mm:ss"
      ),
      max_updated_at: format(
        new Date(episode.Novels.dataValues.max_updated_at),
        "yyyy-MM-dd HH:mm:ss"
      ),
      episode_count: episode.Novels.countEpisodes(),
      likes: episode.Novels.countUserLikeNovels(),
      comments: episode.Novels.countNovelComments(),
      bookmarks: episode.Novels.countUserBookmarkNovels(),
      user: episode.Novels.Users,
      tags: episode.Novels.getNovelTags(),
      badges: episode.Novels.getNovelBadges(),
      user_likes: episode.Novels.getUserLikeNovels(),
      user_bookmarks: episode.Novels.getUserBookmarkNovels(),
    }));

    return {
      novels: novelsNew,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  static async getDetailNovel(novelId, type) {
    if (!type) {
      type = "cumulative";
    }
    const currentTime = new Date();
    let whereConditionTimeFilter = null;
    let order = [];

    // Handle arrange novels
    if (type === "new") {
      order.push(["first_novel_publish_at", "DESC"]);
    } else if (type === "hot") {
      whereConditionTimeFilter = {
        created_at: {
          [Op.between]: [subHours(currentTime, 2), currentTime],
        },
      };
      order.push(["likes", "DESC"]);
    } else {
      let { startOfDay, endOfDay } = await this.getTimeFilter(type);
      if (startOfDay && endOfDay) {
        whereConditionTimeFilter = {
          created_at: {
            [Op.between]: [startOfDay, endOfDay],
          },
        };
      }
      order.push(["likes", "DESC"]);
    }

    const novels = await Novel.findAll({
      attributes: [
        "novel_ulid",
        "novel_id",
        "is_completed",
        "title",
        "synopsis",
        "first_novel_publish_at",
        "cover_picture_url",
        "author",
        "is_publish",
        "created_at",
        "updated_at",
        [
          sequelize.literal(
            "(SELECT publish_at FROM episodes WHERE episodes.novel_id = Novel.novel_id AND episodes.`order` = 1)"
          ),
          "max_updated_at",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.fn("DISTINCT", sequelize.col("userLikeNovels.user_id"))
          ),
          "likes",
        ],
      ],
      include: [
        {
          model: User,
          as: "userLikeNovels",
          attributes: [],
          through: {
            model: UserLike,
            attributes: [],
            where: whereConditionTimeFilter,
          },
        },
        {
          model: User,
          as: "Users",
        },
      ],

      where: { is_publish: 1 },
      group: ["novel_id"],
      order,
      subQuery: false,
    });

    const rank = novels.findIndex((novel) => novel.novel_id === novelId) + 1;
    const novel = novels.find((novel) => novel.novel_id === novelId);

    return {
      novel_ulid: novel.novel_ulid,
      title: novel.title,
      novel_id: novel.novel_id,
      synopsis: novel.synopsis,
      cover_picture_url: novel.cover_picture_url,
      is_completed: novel.is_completed,
      author: novel.author,
      user_uuid: novel.Users.user_uuid,
      first_novel_publish_at: novel.first_novel_publish_at,
      max_updated_at: novel.dataValues.max_updated_at,
      episode_count: novel.countEpisodes(),
      likes: novel.dataValues.likes,
      comments: novel.countNovelComments(),
      bookmarks: novel.countUserBookmarkNovels(),
      user: novel.Users,
      tags: novel.getNovelTags(),
      badges: novel.getNovelBadges(),
      user_likes: novel.getUserLikeNovels({
        through: {
          model: UserLike,
          attributes: [],
          where: whereConditionTimeFilter,
        },
      }),
      user_bookmarks: novel.getUserBookmarkNovels(),
      rank: {
        [type]: rank,
      },
      episodes: novel.getEpisodes(),
      is_publish: novel.is_publish,
      updated_at: novel.updated_at,
      created_at: novel.created_at,
    };
  }

  static async getListNovel(parent, args, context) {
    try {
      const { filter, type } = args;
      const { user } = context;
      let whereCondition = {};
      let order = [];

      if (filter) {
        whereCondition.title = {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        };
      }

      if (type === 1) {
        order.push(["created_at", "DESC"]);
      } else if (type === 2) {
        order.push(["updated_at", "DESC"]);
      }

      const { count, rows: novels } = await Novel.findAndCountAll({
        attributes: [
          "novel_ulid",
          "novel_id",
          "is_completed",
          "title",
          "synopsis",
          "first_novel_publish_at",
          "cover_picture_url",
          "author",
          "created_at",
          "updated_at",
          [
            sequelize.literal(
              "(SELECT publish_at FROM episodes WHERE episodes.novel_id = Novel.novel_id AND episodes.`order` = 1)"
            ),
            "max_updated_at",
          ],
        ],
        include: [
          {
            model: Episode,
            as: "episodes",
            attributes: [],
            required: false, // inner join (true when search, false not search)
          },
          {
            model: User,
            as: "userLikeNovels",
            attributes: [],
            through: {
              model: UserLike,
              attributes: [],
            },
          },
          {
            model: User,
            as: "Users",
          },
        ],

        where: { ...whereCondition, is_publish: 1 },
        order,
        limit: 5,
      });

      const novelsNew = novels.map((novel, index) => ({
        novel_ulid: novel.novel_ulid,
        title: novel.title,
        novel_id: novel.novel_id,
        synopsis: novel.synopsis,
        cover_picture_url: novel.cover_picture_url,
        is_completed: novel.is_completed,
        author: novel.author,
        user_uuid: novel.Users.user_uuid,
        first_novel_publish_at: format(
          new Date(novel.first_novel_publish_at),
          "yyyy-MM-dd HH:mm:ss"
        ),
        max_updated_at: format(
          new Date(novel.dataValues.max_updated_at),
          "yyyy-MM-dd HH:mm:ss"
        ),
        episode_count: novel.countEpisodes(),
        likes: novel.countUserLikeNovels(),
        comments: novel.countNovelComments(),
        bookmarks: novel.countUserBookmarkNovels(),
        user: novel.Users,
        tags: novel.getNovelTags(),
        badges: novel.getNovelBadges(),
        user_likes: novel.getUserLikeNovels(),
        user_bookmarks: novel.getUserBookmarkNovels(),
        created_at: novel.created_at,
        updated_at: novel.updated_at,
      }));

      return {
        novels: novelsNew,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  static async paginate(parent, args, context) {
    try {
      const { page, limit, filter, type } = args;
      const { user } = context;
      const currentTime = new Date();

      let whereCondition = {};
      let whereConditionTag = {};
      let whereConditionTimeFilter = null;
      let order = [];

      if (filter) {
        whereCondition.title = {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        };
        if (filter.tagName) {
          whereConditionTag = { tag: filter.tagName };
        }
      }

      // Handle arrange novels
      if (type === "new") {
        order.push(["first_novel_publish_at", "DESC"]);
      } else if (type === "latest") {
        return this.getFilterNovelByLatest(page, limit, whereCondition);
      } else if (type === "hot") {
        whereConditionTimeFilter = {
          created_at: {
            [Op.between]: [subHours(currentTime, 2), currentTime],
          },
        };
        order.push(["likes", "DESC"]);
      } else {
        let { startOfDay, endOfDay } = await this.getTimeFilter(type);
        if (startOfDay && endOfDay) {
          whereConditionTimeFilter = {
            created_at: {
              [Op.between]: [startOfDay, endOfDay],
            },
          };
        }
        order.push(["likes", "DESC"]);
      }

      const offset = (page - 1) * limit;
      const { count, rows: novels } = await Novel.findAndCountAll({
        attributes: [
          "novel_ulid",
          "novel_id",
          "is_completed",
          "title",
          "synopsis",
          "first_novel_publish_at",
          "cover_picture_url",
          "author",
          [
            sequelize.literal(
              "(SELECT publish_at FROM episodes WHERE episodes.novel_id = Novel.novel_id AND episodes.`order` = 1)"
            ),
            "max_updated_at",
          ],
          [
            sequelize.fn(
              "COUNT",
              sequelize.fn("DISTINCT", sequelize.col("userLikeNovels.user_id"))
            ),
            "likes",
          ],
        ],
        include: [
          {
            model: Episode,
            as: "episodes",
            attributes: [],
            required: false, // inner join (true when search, false not search)
          },
          {
            model: User,
            as: "userLikeNovels",
            attributes: [],
            through: {
              model: UserLike,
              attributes: [],
              where: whereConditionTimeFilter,
            },
          },
          {
            model: OfficialTag,
            as: "novelTags",
            attributes: [],
            where: whereConditionTag,
            through: {
              model: NovelTag,
              attributes: [],
            },
          },
          {
            model: User,
            as: "Users",
          },
        ],

        where: { ...whereCondition, is_publish: 1 },
        group: ["novel_id"],
        order,
        limit,
        offset,
        subQuery: false,
      });

      const totalNovels = count.length;

      const novelsNew = novels.map((novel, index) => ({
        novel_ulid: novel.novel_ulid,
        title: novel.title,
        novel_id: novel.novel_id,
        synopsis: novel.synopsis,
        cover_picture_url: novel.cover_picture_url,
        is_completed: novel.is_completed,
        author: novel.author,
        user_uuid: novel.Users.user_uuid,
        first_novel_publish_at: format(
          new Date(novel.first_novel_publish_at),
          "yyyy-MM-dd HH:mm:ss"
        ),
        max_updated_at: format(
          new Date(novel.dataValues.max_updated_at),
          "yyyy-MM-dd HH:mm:ss"
        ),
        episode_count: novel.countEpisodes(),
        likes: novel.dataValues.likes,
        comments: novel.countNovelComments(),
        bookmarks: novel.countUserBookmarkNovels(),
        episodes: novel.getEpisodes(),
        user: novel.Users,
        tags: novel.getNovelTags(),
        badges: novel.getNovelBadges(),
        user_likes: novel.getUserLikeNovels({
          through: {
            model: UserLike,
            attributes: [],
            where: whereConditionTimeFilter,
          },
        }),
        user_bookmarks: novel.getUserBookmarkNovels(),
        rank: {
          [type]: index + 1,
        },
      }));

      return {
        novels: novelsNew,
        totalItems: totalNovels,
        totalPages: Math.ceil(totalNovels / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
  static async getListNovelByAuthor(parent, args, context) {
    try {
      const { page, limit, filter, type, userId } = args;
      const { user } = context;
      if (!user) {
        return null;
      }

      const offset = (page - 1) * limit;
      const { count, rows: novels } = await Novel.findAndCountAll({
        attributes: [
          "novel_ulid",
          "novel_id",
          "is_completed",
          "title",
          "synopsis",
          "first_novel_publish_at",
          "cover_picture_url",
          "author",
        ],

        where: { is_publish: 1, user_id: userId },
        limit,
        offset,
        subQuery: false,
      });

      const totalNovels = count;

      const novelsNew = novels.map((novel) => ({
        novel_ulid: novel.novel_ulid,
        title: novel.title,
        novel_id: novel.novel_id,
        synopsis: novel.synopsis,
        cover_picture_url: novel.cover_picture_url,
        is_completed: novel.is_completed,
        author: novel.author,
        first_novel_publish_at: format(
          new Date(novel.first_novel_publish_at),
          "yyyy-MM-dd HH:mm:ss"
        ),
        episode_count: novel.countEpisodes(),
        likes: novel.countUserLikeNovels(),
        comments: novel.countNovelComments(),
        bookmarks: novel.countUserBookmarkNovels(),
        user: novel.getUsers(),
        tags: novel.getNovelTags(),
        badges: novel.getNovelBadges(),
        user_likes: novel.getUserLikeNovels(),
        user_bookmarks: novel.getUserBookmarkNovels(),
        episodes: novel.getEpisodes(),
      }));

      return {
        novels: novelsNew,
        totalItems: totalNovels,
        totalPages: Math.ceil(totalNovels / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  static async getListNovelUserLike(parent, args, context) {
    const { pageNovelLike: page, limitNovelLike: limit, userId } = args;

    const offset = (page - 1) * limit;
    const { count, rows: novels } = await Novel.findAndCountAll({
      attributes: [
        "novel_ulid",
        "novel_id",
        "is_completed",
        "title",
        "synopsis",
        "first_novel_publish_at",
        "cover_picture_url",
        "author",
      ],
      include: [
        {
          model: User,
          as: "userLikeNovels",
          attributes: [],
          where: { user_id: userId },
          through: {
            model: UserLike,
            attributes: [],
          },
        },
      ],

      where: { is_publish: 1 },
      limit,
      offset,
    });

    const totalNovels = count;

    return {
      novels: novels,
      totalItems: totalNovels,
      totalPages: Math.ceil(totalNovels / limit),
      currentPage: page,
    };
  }
}
module.exports = NovelService;
