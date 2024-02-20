const {GraphQLError} = require("graphql");
const {User, Novel, Match, MatchNovel} = require("../../models");
const matchNovelResolver = {
    Query: {
        getMatchNovel: async (parent, args, context) => {
            try {
                const users = await MatchNovel.findAll();
                console.log(users)
                return users
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

    },
    Mutation: {
        createMatchNovel: async (parent, args, context) => {
            try {
                const {match_id, novel_id, vote_count, result_type, is_post} = args.input;

                const match = await Match.findOne({
                    where: {match_id: match_id}
                });

                const novel = await Novel.findOne({
                    where: {novel_id: novel_id}
                });
                return await MatchNovel.create({match_id, novel_id, vote_count, result_type, is_post})
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateMatchNovel: async (parent, args, context) => {
            try {
                const {vote_count, result_type, is_post} = args.input;

                // const match = await Match.findOne({
                //     where: {match_id: match_id}
                // });
                //
                // const novel = await Novel.findOne({
                //     where: {novel_id: novel_id}
                // });
                const updatedValues = {
                    vote_count,
                    result_type,
                    is_post
                }
                await MatchNovel.update(updatedValues, {
                    where: {
                        match_id: args.match_id, novel_id: args.novel_id
                    },
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

        deleteMatchNovel: async (parent, args, context) => {
            try {
                const {match_id, novel_id} = args;
                await MatchNovel.destroy({
                    where: {match_id, novel_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    matchNovelResolver,
};