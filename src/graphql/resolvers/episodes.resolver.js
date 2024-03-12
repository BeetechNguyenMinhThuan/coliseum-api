const { GraphQLError } = require("graphql");
const { Episode } = require("../../models");
const EpisodeService = require("../../services/episodeService");

const episodeResolver = {
  Query: {
    episode: async (parent, args, context) => {
      return EpisodeService.find(parent, args, context);
    },
    episodes: async (parent, args, context) => {
      return EpisodeService.paginate(parent, args, context);
    },
  },
  Mutation: {
    createEpisode: async (parent, args, context) => {
      try {
        const data = ({
          episode_ulid,
          episode_title,
          episode_type,
          order,
          episode_url,
          is_publish,
          publish_at,
          first_novel_publish_at,
        } = args.input);
        return await Episode.create(data);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateEpisode: async (parent, args, context) => {
      try {
        const episode_id = args.episode_id;
        const data = ({
          episode_ulid,
          episode_title,
          episode_type,
          order,
          episode_url,
          is_publish,
          publish_at,
          first_novel_publish_at,
        } = args.input);
        await Episode.update(data, {
          where: {
            episode_id: episode_id,
          },
        });
        return Episode.findOne({
          where: {
            episode_id: episode_id,
          },
        });
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteEpisode: async (parent, args, context) => {
      try {
        const episode_id = args.episode_id;
        await Episode.destroy({
          where: { episode_id: episode_id },
        });
        return "OK";
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = {
  episodeResolver,
};
