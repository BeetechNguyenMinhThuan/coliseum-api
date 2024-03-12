const { GraphQLError } = require("graphql");
const { Episode, Novel } = require("../models");
class EpisodeService {
  static async find(parent, args, context) {
    try {
      const { type, episodeId, novelId } = args;
      const { user } = context;

      let whereCondition = {};

      const episode = await Episode.findOne({
        where: { episode_id: episodeId, novel_id: novelId },
      });

      const totalEpisodes = await Episode.count({
        where: { novel_id: novelId },
      });

      // 1: Next
      // 2: Previous
      if (type === "1") {
        whereCondition = {
          novel_id: novelId,
          order: episode.order + 1,
        };
      } else if (type === "2") {
        whereCondition = {
          novel_id: novelId,
          order: episode.order - 1,
        };
      }
      const episodeData = await Episode.findOne({
        where: whereCondition,
      });

      if (!episodeData) {
        throw new GraphQLError("Episode not found");
      }

      return {
        episode: episodeData,
        totalEpisodes: totalEpisodes,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
module.exports = EpisodeService;
