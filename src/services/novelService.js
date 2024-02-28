const { GraphQLError } = require("graphql");
const {
  Novel,
  UserLike,
  User,
  OfficialBadge,
  OfficialTag,
  Sequelize,
} = require("../models");
const { Op } = require("sequelize");
const { subHours, subDays, format } = require("date-fns");
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
        timeFilter = subDays(currentTime, 2);
        break;
      default:
        break;
    }
    return timeFilter;
  }

  static async paginate(parent, args, context) {
    try {
      const { page, limit, filter, type } = args;
      const { user } = context;
      const currentTime = new Date();

      if (!user) {
        return null;
      }

      const whereCondition = {
        title: {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        },
      };

      let order = [];
      if (type === "new") {
        order.push(["first_novel_publish_at", "DESC"]);
      }

      let timeFilter = await this.getTimeFilter(type);
      let whereConditionTimeFilter = null;
      if (timeFilter) {
        whereConditionTimeFilter = {
          created_at: {
            [Op.between]: [timeFilter, currentTime],
          },
        };
        order.push([
          Sequelize.literal(
            "(SELECT COUNT(*) FROM user_likes WHERE user_likes.novel_id = Novel.novel_id)"
          ),
          "DESC",
        ]);
      }

      const offset = (page - 1) * limit;
      const { count, rows: novels } = await Novel.findAndCountAll({
        include: [
          {
            model: User,
            as: "userLikeNovels",
            through: {
              model: UserLike,
              where: whereConditionTimeFilter,
            },
          },
          {
            model: OfficialBadge,
            as: "novelBadges",
          },
          {
            model: User,
            as: "Users",
          },
          {
            model: OfficialTag,
            as: "novelTags",
          },
          {
            model: User,
            as: "userBookmarkNovels",
          },
        ],
        where: whereCondition,
        order,
        offset,
        limit,
      });

      const novelsNew = novels.map((novel) => ({
        novel_id: novel.novel_id,
        user: novel.Users,
        likes: novel.userLikeNovels.length,
        bookmarks: novel.userBookmarkNovels.length,
        title: novel.title,
        user_like: novel.userLikeNovels,
        novel_badges: novel.novelBadges,
        synopsis: novel.synopsis,
        created_at: format(new Date(novel.created_at),'yyyy-MM-dd hh:mm:ii')
      }));

      return {
        novels: novelsNew,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
module.exports = NovelService;
