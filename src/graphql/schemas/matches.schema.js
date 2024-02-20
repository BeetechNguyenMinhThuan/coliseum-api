const {gql} = require("graphql-tag");
const matchSchema = gql`
    type Match {
        match_id: ID!
        round_id: Int!
        match_uuid: String
        match_name: String
        vote_count: Int
        winner_count: Int
        winner_type: Int
        created_at: String
        updated_at: String
        deleted_at: String
    }

    type Query {
        getAllMatches: [Match]
        getMatchById(match_id: ID!): Match,
    }

    input UpdateMatchInput {
        match_uuid: String,
        match_id: ID!, 
        round_id: Int, 
        match_name: String, 
        vote_count: Int, 
        winner_count: Int, 
        winner_type: Int
    }

    type Mutation {
        createMatch(round_id: Int!, match_uuid: String!, match_name: String!, vote_count: Int, winner_count: Int, winner_type: Int): Match
        updateMatch(updates: [UpdateMatchInput!]!): [Match]
        deleteMatch(match_id: ID!): Match
    }
`

module.exports = {
    matchSchema: matchSchema,
};