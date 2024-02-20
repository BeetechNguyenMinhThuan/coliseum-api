const {GraphQLError} = require("graphql");
const {Episode} = require('../../models');

const episodeResolver = {
    Query: {
        episodes: async (parent, args, context) => {
            try {
                return await Episode.findAll();
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        episode: async (parent, args, context) => {
            try {
                const {episode_id} = args;

                return await Episode.findOne({
                    where: {episode_id: episode_id}
                });
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        createEpisode: async (parent, args, context) => {
            try {
                const data = {
                    episode_ulid,
                    episode_title,
                    episode_type,
                    order,
                    episode_url,
                    is_publish,
                    publish_at,
                    first_novel_publish_at,
                } = args.input;
                return await Episode.create(data)
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        updateEpisode: async (parent, args, context) => {
            try {
                const episode_id = args.episode_id
                const data = {
                    episode_ulid,
                    episode_title,
                    episode_type,
                    order,
                    episode_url,
                    is_publish,
                    publish_at,
                    first_novel_publish_at,
                } = args.input;
                await Episode.update(data, {
                    where: {
                        episode_id: episode_id,
                    }
                })
                return Episode.findOne({
                    where: {
                        episode_id: episode_id,
                    }
                })
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        deleteEpisode: async (parent, args, context) => {
            try {
                const episode_id = args.episode_id
                await Episode.destroy({
                    where: {episode_id: episode_id}
                });
                return "OK"
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    }
}

module.exports = {
    episodeResolver,
};