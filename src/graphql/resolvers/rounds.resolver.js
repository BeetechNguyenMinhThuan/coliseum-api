const { GraphQLError } = require("graphql");
const { Round, Event, User } = require("../../models");
const { ErrorTypes, throwCustomError } = require("../../heplers/errorHandle");
const { sequelize } = require("../../models");
const Joi = require("joi");
const { createNewRound } = require("../../validations/round.validation");
const RoundService = require("../../services/round.service");
const { Op } = require("sequelize");

const roundResolver = {
  Query: {
    rounds: async (parent, args, context) => {
      const res = await RoundService.get(args);
      return res;
    },
    round: async (parent, args, context) => {
      try {
        const { round_id } = args;

        return await Round.findOne({
          where: { round_id: round_id },
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getRoundsPaginate: async (parent, { page, limit, filter }, context) => {
      try {
        const whereCondition = {
          round_name: {
            [Op.like]: `%${filter.searchValue ?? ""}%`,
          },
        };

        const filtersRoundType = [
          { key: `isColiseum`, value: 1 },
          { key: `isLeageMatch`, value: 2 },
        ];

        filtersRoundType.forEach(({ key, value }) => {
          if (filter[key] === true) {
            whereCondition.round_type = whereCondition.round_type
              ? [...whereCondition.round_type, value]
              : [value];
          }
        });

        const offset = (page - 1) * limit;
        const { count, rows } = await Round.findAndCountAll({
          where: whereCondition,
          offset,
          limit,
        });

        return {
          rounds: rows,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Round: {
    event: async (parent, args, context) => {
      try {
        const { event_id } = parent;

        return await Event.findOne({
          where: { event_id: event_id },
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createRound: async (parent, args, context) => {
      try {
        const data = ({
          event_id,
          ulid,
          round_name,
          round_order,
          round_start_at,
          round_finish_at,
          vote_start_at,
          vote_finish_at,
          round_type,
          is_currentBoolean,
          winner_count,
          min_word_count,
          max_word_count,
          tag,
          created_at,
          updated_at,
          deleted_at,
        } = args.input);

        // Validate data
        await createNewRound(data);

        if (round_name === "hello") {
          throw new GraphQLError("trung du lieu");
        }

        return await Round.create(data);
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    updateRound: async (parent, args, context) => {
      try {
        const round_id = args.round_id;
        const data = ({
          event_id,
          ulid,
          round_name,
          round_order,
          round_start_at,
          round_finish_at,
          vote_start_at,
          vote_finish_at,
          round_type,
          is_currentBoolean,
          winner_count,
          min_word_count,
          max_word_count,
          tag,
          created_at,
          updated_at,
          deleted_at,
        } = args.input);

        await Round.update(data, {
          where: {
            round_id: round_id,
          },
        });
        return Round.findOne({
          where: {
            round_id: round_id,
          },
        });
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    updateMultipleRound: async (parent, args, context) => {
      const t = await sequelize.transaction();
      try {
        const event_id = args.event_id;
        const data = ({
          ulid,
          round_name,
          round_order,
          round_start_at,
          round_finish_at,
          vote_start_at,
          vote_finish_at,
          round_type,
          is_currentBoolean,
          winner_count,
          min_word_count,
          max_word_count,
          tag,
          created_at,
          updated_at,
          deleted_at,
        } = args.input);

        const cleanData = {
          ...data,
          round_name: validator.escape(data.round_name),
        };
        await Round.update(cleanData, {
          where: {
            event_id: event_id,
          },
          transaction: t,
        });
        await User.update(
          { first_login_at: "2024-01-10 07:51:14" },
          {
            where: { user_id: 1 },
            transaction: t,
          }
        );
        await t.commit();
        return "OK";
      } catch (error) {
        await t.rollback();
        throw new GraphQLError(error);
      }
    },
    deleteRound: async (parent, args, context) => {
      try {
        const round_id = args.round_id;
        await Round.destroy({
          where: { round_id: round_id },
        });
        return "OK";
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = {
  roundResolver,
};
