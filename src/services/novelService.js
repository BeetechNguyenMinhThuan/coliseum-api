const { GraphQLError } = require("graphql");
const {
  Novel,
  UserLike,
  User,
  OfficialBadge,
  OfficialTag,
  UserBookmark,
  NovelComment,
  NovelBadge,
  Episode,
  NovelTag,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const { subHours, subDays, format } = require("date-fns");
const { required } = require("joi");
const { raw } = require("mysql2");
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
    let timeFilter = null;
    const currentTime = new Date();
    switch (type) {
      case "hot":
        timeFilter = subHours(currentTime, 2);
        break;
      case "weekly":
        timeFilter = subDays(currentTime, 7);
        break;
      case "monthly":
        timeFilter = subDays(currentTime, 30);
        break;
      case "quarterly":
        timeFilter = subDays(currentTime, 90);
        break;
      case "yearly":
        timeFilter = subDays(currentTime, 365);
        break;
      case "cumulative":
        timeFilter = null;
        break;
      default:
        break;
    }
    return timeFilter;
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
    const totalNovels = count;
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
      user_likes: episode.Novels.getUserLikeNovels({
        through: {
          model: UserLike,
          attributes: [],
        },
      }),
      user_bookmarks: episode.Novels.getUserBookmarkNovels(),
    }));

    return {
      novels: novelsNew,
      totalItems: totalNovels,
      totalPages: Math.ceil(totalNovels / limit),
      currentPage: page,
    };
  }

  static async paginate(parent, args, context) {
    try {
      const { page, limit, filter, type } = args;
      const { user } = context;
      if (!user) {
        return null;
      }
      const currentTime = new Date();
      let whereCondition = {};
      let order = [];

      if (filter) {
        whereCondition.title = {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        };
      }

      if (type === "new") {
        order.push(["first_novel_publish_at", "DESC"]);
      } else if (type === "latest") {
        return this.getFilterNovelByLatest(page, limit, whereCondition);
      }

      let timeFilter = await this.getTimeFilter(type);
      let whereConditionTimeFilter = null;
      if (timeFilter) {
        whereConditionTimeFilter = {
          created_at: {
            [Op.between]: [timeFilter, currentTime],
          },
        };
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

      const novelsNew = novels.map((novel) => ({
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

      console.log(totalNovels);
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
}
module.exports = NovelService;
