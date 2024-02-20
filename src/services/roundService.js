const { GraphQLError } = require("graphql");
const { Round } = require("../models");
const { Op } = require("sequelize");
class RoundService {
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
}
module.exports = RoundService;
