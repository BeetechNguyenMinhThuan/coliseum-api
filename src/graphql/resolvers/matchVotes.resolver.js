const {GraphQLError} = require("graphql");
const {Novel, Match, MatchVote} = require("../../models");
const matchVoteResolver = {
    Query: {
        getMatchVote: async (parent, args, context) => {
            try {
                const users = await MatchVote.findAll();
                console.log(users)
                return users
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

    },
    Mutation: {
        createMatchVote: async (parent, args, context) => {
            try {
                const {match_vote_id, novel_id, vote_count, is_titaling} = args.input;
                const match = await Match.findOne({
                    where: {match_id: match_vote_id}
                });

                const novel = await Novel.findOne({
                    where: {novel_id: novel_id}
                });
                return await MatchVote.create({match_vote_id, novel_id, vote_count, is_titaling})
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateMatchVote: async (parent, args, context) => {
            try {
                const {vote_count, is_titaling} = args.input;
                // const match = await Match.findOne({
                //     where: {match_id: match_vote_id}
                // });
                //
                // const novel = await Novel.findOne({
                //     where: {novel_id: novel_id}
                // });
                const updatedValues = {
                    vote_count,
                    is_titaling,
                }
                await MatchVote.update(updatedValues, {
                    where: {
                        match_vote_id:args.match_vote_id, novel_id:args.novel_id
                    },
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },

        deleteMatchVote: async (parent, args, context) => {
            try {
                const {match_vote_id, novel_id} = args;
                await MatchVote.destroy({
                    where: {match_vote_id, novel_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    matchVoteResolver,
};