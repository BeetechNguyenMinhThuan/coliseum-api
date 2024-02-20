const {GraphQLError} = require("graphql");
const {User, Novel, UserBookmark} = require("../../models");
const userBookmarkResolver = {
    Query: {
        getUserBookmark: async (parent, args, context) => {
            try {
                const users = await UserBookmark.findAll();
                console.log(users)
                return users
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

    },
    Mutation: {
        createUserBookmark: async (parent, args, context) => {
            try {
                const {user_id, novel_id} = args;
                const user = await User.findOne({
                    where: {user_id: user_id}
                });

                const novel = await Novel.findOne({
                    where: {novel_id: novel_id}
                });
                await UserBookmark.create({ user_id: user.user_id, novel_id: novel.novel_id });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

        deleteUserBookmark: async (parent, args, context) => {
            try {
                const {user_id, novel_id} = args;
                await UserBookmark.destroy({
                    where: {user_id, novel_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    userBookmarkResolver,
};