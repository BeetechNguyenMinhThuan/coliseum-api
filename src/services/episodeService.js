const { GraphQLError } = require("graphql");
const { Episode, Novel, sequelize } = require("../models");
class EpisodeService {
  static async find(parent, args, context) {
    try {
      const { type, episodeId, novelId } = args;
      const { user } = context;

      let whereCondition = { episode_id: episodeId, novel_id: novelId };

      const episode = await Episode.findOne({
        where: whereCondition,
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
  static async paginate(parent, args, context) {
    try {
      const { page, limit, type, episodeId, novelId } = args;

      const { user } = context;

      let whereCondition = { novel_id: novelId };
      const offset = (page - 1) * limit;

      if (episodeId) {
        const episodeList = await Episode.findAll({
          where: whereCondition,
          order: [["order", "ASC"]],
        });
        const index = episodeList.findIndex(
          (episode) => episode.episode_id === episodeId
        );

        const episodeItem = await Episode.findAll({
          where: { novel_id: novelId, episode_id: episodeId },
        });

        if (!episodeItem.length > 0) {
          throw new GraphQLError("Episode not found");
        }

        return {
          episodes: episodeItem,
          totalItems: episodeList.length,
          totalPages: Math.ceil(episodeList.length / 1),
          currentPage: index + 1,
        };
      }

      const { count, rows: episodes } = await Episode.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["order", "ASC"]],
      });

      return {
        episodes: episodes,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
module.exports = EpisodeService;
