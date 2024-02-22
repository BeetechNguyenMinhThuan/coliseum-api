const {
  User,
  Novel,
  UserBookmark,
  UserLike,
  OfficialBadge,
} = require("../../models");
const { GraphQLError } = require("graphql");
const { throwCustomError } = require("../../heplers/errorHandle");
const { ErrorTypes } = require("../../heplers/errorHandle");
const userResolver = {
  Query: {
    getUsers: async (parent, args, context) => {
      try {
        return await User.findAll({
          include: [
            {
              model: Novel,
              as: "userLikeNovels",
            },
            {
              model: Novel,
              as: "userBookmarkNovels",
            },
            {
              model: OfficialBadge,
            },
          ],
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    author: async (parent, args, context) => {
      try {
        const { user_id } = args;
        const author = await User.findOne({ where: { user_id } });
        return author;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    getUsersPaginate: async (parent, { page, limit }, context) => {
      try {
        const offset = (page - 1) * limit;
        const { count, rows } = await User.findAndCountAll({
          offset,
          limit,
        });

        return {
          users: rows,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  User: {
    novel_like: async (parent, args, context) => {
      try {
        return await parent.getUserLikeNovels();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    novel_bookmark: async (parent, args, context) => {
      try {
        return await parent.getUserBookmarkNovels();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    user_badges: async (parent, args, context) => {
      try {
        return await parent.getOfficialBadges();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      try {
        const { user_uuid, name, s3_url, first_login_at, last_login_at } =
          args.input;

        if (
          !user_uuid ||
          !name ||
          !s3_url ||
          !first_login_at ||
          !last_login_at
        ) {
          throwCustomError("Error input.", ErrorTypes.BAD_USER_INPUT);
        }
        const result = await User.create({
          user_uuid,
          name,
          s3_url,
          first_login_at,
          last_login_at,
        });

        return {
          code: "200",
          success: true,
          message: "User created successfully",
          user: result,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = {
  userResolver,
};
