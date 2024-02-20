const {gql} = require("graphql-tag");

const matchVoteSchema = gql`
    type MatchVote {
        match_vote_id: Int,
        novel_id: Int
        vote_count: Int
        is_titaling: Boolean
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
    input MatchVoteUpdate {
        vote_count: Int
        is_titaling: Boolean
    }
    input MatchVoteCreate{
        match_vote_id: Int
        novel_id:Int
        vote_count: Int
        is_titaling: Boolean
    }
    extend type Query {
        getMatchVote: [MatchVote]
    }

    extend type Mutation {
        createMatchVote(input:MatchVoteCreate): MatchVote
        updateMatchVote(match_vote_id:Int, novel_id:Int,input:MatchVoteUpdate): MatchVote
        deleteMatchVote(match_vote_id:Int, novel_id:Int): String
    }
`;

module.exports = {
    matchVoteSchema,
};
