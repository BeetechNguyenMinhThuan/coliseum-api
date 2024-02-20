const {GraphQLError} = require("graphql");
const {UserBadge, User, OfficialBadge} = require("../../models");
const userBadgesResolver = {
    Query: {
        getUserAndBadge: async (parent, args, context) => {
            try {
                const users = await User.findAll({
                    include: [OfficialBadge]
                });
                return users
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        }
    },
    Mutation: {
        createUserBadge: async (parent, args, context) => {
            try {
                const {user_id, badges_id} = args;
                const user = await User.findOne({
                    where: {user_id: user_id}
                });

                const novel = await Novel.findOne({
                    where: {novel_id: novel_id}
                });
                return await user.addNovel(novel)
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        deleteOfficialTag: async (parent, args, context) => {
            try {
                const {tag_id} = args;
                await OfficialTag.destroy({
                    where: {tag_id: tag_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    userBadgesResolver,
};