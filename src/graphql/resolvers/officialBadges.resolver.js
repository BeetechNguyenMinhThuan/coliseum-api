const {GraphQLError} = require("graphql/index");
const {OfficialBadge} = require("../../models");
const officialBadgeResolver = {
    Query: {
        getAllOfficialBadges: async (parent, args, context) => {
            try {
                return await OfficialBadge.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getOfficialBadgeById: async (parent, args, context) => {
            try {
                const {badges_id} = args;
                return await OfficialBadge.findOne({
                    where: {badges_id: badges_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createOfficialBadge: async (parent, args, context) => {
            try {
                const {badges_ulid, badges_name, badges_url, start_at, finish_at} = args;
                return await OfficialBadge.create({badges_ulid, badges_name, badges_url, start_at, finish_at})
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateOfficialBadge: async (parent, args, context) => {
            try {
                const {badges_id, badges_ulid, badges_name, badges_url, start_at, finish_at} = args;
                await OfficialBadge.update({badges_id, badges_ulid, badges_name, badges_url, start_at, finish_at}, {
                    where: {
                        badges_id: badges_id,
                    }
                })
                return OfficialBadge.findOne({
                    where: {
                        badges_id: badges_id,
                    }
                })
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        deleteOfficialBadge: async (parent, args, context) => {
            try {
                const {badges_id} = args;
                await OfficialBadge.destroy({
                    where: {badges_id: badges_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    officialBadgeResolver,
};