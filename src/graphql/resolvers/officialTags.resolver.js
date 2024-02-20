const {GraphQLError} = require("graphql/index");
const {OfficialTag} = require("../../models");
const officialTagResolver = {
    Query: {
        getAllOfficialTags: async (parent, args, context) => {
            try {
                return await OfficialTag.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        getOfficialTagById: async (parent, args, context) => {
            try {
                const {tag_id} = args;
                return await OfficialTag.findOne({
                    where: {tag_id: tag_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createOfficialTag: async (parent, args, context) => {
            try {
                const {tag_ulid, tag, start_at, finish_at} = args;
                return await OfficialTag.create({tag_ulid, tag, start_at, finish_at})
            } catch (error) {
                console.log(error)
                throw new GraphQLError(error.message);
            }
        },
        updateOfficialTag: async (parent, args, context) => {
            try {
                const {tag_id, tag_ulid, tag, start_at, finish_at} = args;
                await OfficialTag.update({tag_id, tag_ulid, tag, start_at, finish_at}, {
                    where: {
                        tag_id: tag_id,
                    }
                })
                return OfficialTag.findOne({
                    where: {
                        tag_id: tag_id,
                    }
                })
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
    officialTagResolver,
};