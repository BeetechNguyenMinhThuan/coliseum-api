const {gql} = require("graphql-tag");

const matchNovelSchema = gql`
    type MatchNovel {
        match_id: Int,
        novel_id: Int
        vote_count: Int
        result_type: Int
        is_post: Boolean
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
    input MatchNovelUpdate {
        vote_count: Int
        result_type: Int
        is_post: Boolean
    }
    input MatchNovelCreate{
        match_id: Int,
        novel_id: Int
        vote_count: Int
        result_type: Int
        is_post: Boolean
    }
    extend type Query {
        getMatchNovel: [MatchNovel]
    }

    extend type Mutation {
        createMatchNovel(input:MatchNovelCreate): MatchNovel
        updateMatchNovel(match_id:Int, novel_id:Int,input:MatchNovelUpdate): MatchNovel
        deleteMatchNovel(match_id:Int, novel_id:Int): String
    }
`;

module.exports = {
    matchNovelSchema,
};
