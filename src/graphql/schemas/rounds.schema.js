const { gql } = require("graphql-tag");
const roundSchema = gql`
  type Round {
    round_id: Int
    event_id: Int
    ulid: String
    round_name: String
    round_order: Int
    round_start_at: DateTime
    round_finish_at: DateTime
    vote_start_at: DateTime
    vote_finish_at: DateTime
    round_type: Int
    is_current: Int
    winner_count: Int
    min_word_count: Int
    max_word_count: Int
    tag: String
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
    event: Event
  }
  input RoundInput {
    event_id: Int
    ulid: String
    round_name: String
    round_order: Int
    round_start_at: DateTime
    round_finish_at: DateTime
    vote_start_at: DateTime
    vote_finish_at: DateTime
    round_type: Int
    is_current: Int
    winner_count: Int
    min_word_count: Int
    max_word_count: Int
    tag: String
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
  }

  type RoundPagination {
    rounds: [Round!]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  input filterRound {
    searchValue: String
    isColiseum: Boolean
    isLeageMatch: Boolean
  }

  type Query {
    round(round_id: Int!): Round
    rounds(search: String): [Round]
    getRoundsPaginate(
      page: Int
      limit: Int
      filter: filterRound
    ): RoundPagination
  }

  type Mutation {
    createRound(input: RoundInput!): Round
    updateRound(round_id: Int!, input: RoundInput!): Round
    updateMultipleRound(event_id: Int!, input: RoundInput!): String
    deleteRound(round_id: Int!): String
  }
`;

module.exports = {
  roundSchema,
};
