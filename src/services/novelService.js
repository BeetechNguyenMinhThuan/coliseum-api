const { GraphQLError } = require("graphql");
const { Novel, sequelize,User } = require("../models");
const { Op } = require("sequelize");
const { includes } = require("../graphql/schemas/index.schema");
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

  static async paginate(parent, args, context) {
    try {
      const { page, limit, filter, type } = args;
      const { user } = context;

      if (!user) {
        return null;
      }

      const whereCondition = {
        title: {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        },
      };

      let order = [];
      switch (type) {
        case "new":
          order = [["first_novel_publish_at", "DESC"]];
          break;
        case "hot":
          const twoHoursAgo = new Date();
          break;
        case "weekly":
          break;
        default:
          break;
      }



      const offset = (page - 1) * limit;
      const { count, rows } = await Novel.findAndCountAll({
        where: whereCondition,
        order,
        offset,
        limit,
      });

      return {
        novels: rows,
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
