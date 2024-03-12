const { gql } = require("graphql-tag");
const episodeSchema = gql`
  type Episode {
    episode_id: Int
    episode_ulid: String
    episode_title: String
    episode_type: Int
    order: Int
    episode_url: String
    is_publish: Boolean
    publish_at: DateTime
    first_novel_publish_at: DateTime
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
  }
  input EpisodeInput {
    episode_ulid: String
    episode_title: String
    episode_type: Int
    order: Int
    episode_url: String
    is_publish: Boolean
    publish_at: DateTime
    first_novel_publish_at: DateTime
  }

  type EpisodePagination {
    episodes: [Episode!]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  type EpisodeResponse {
    episode: Episode
    totalEpisodes: Int
  }

  type Query {
    episodes(
      page: Int
      limit: Int
      novelId: Int!
      type: String
      episodeId: Int
    ): EpisodePagination
    episode(novelId: Int!, type: String, episodeId: Int!): EpisodeResponse
  }

  type Mutation {
    createEpisode(input: EpisodeInput!): Episode
    updateEpisode(episode_id: Int!, input: EpisodeInput!): Episode
    deleteEpisode(episode_id: Int!): String
  }
`;

module.exports = {
  episodeSchema,
};
