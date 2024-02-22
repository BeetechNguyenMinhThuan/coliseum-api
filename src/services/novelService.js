const { GraphQLError } = require("graphql");
const { Novel } = require("../models");
const { Op } = require("sequelize");
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
      const { page, limit, filter } = args;
      const { user } = context;

      if (!user) {
        return null;
      }
      const whereCondition = {
        title: {
          [Op.like]: `%${filter?.searchValue ?? ""}%`,
        },
      };

      // const filtersRoundType = [
      //   { key: `isColiseum`, value: 1 },
      //   { key: `isLeageMatch`, value: 2 },
      // ];

      // filtersRoundType.forEach(({ key, value }) => {
      //   if (filter[key] === true) {
      //     whereCondition.round_type = whereCondition.round_type
      //       ? [...whereCondition.round_type, value]
      //       : [value];
      //   }
      // });

      const offset = (page - 1) * limit;
      const { count, rows } = await Novel.findAndCountAll({
        where: whereCondition,
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
