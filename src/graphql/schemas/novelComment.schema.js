const {gql} = require("graphql-tag");
const novelCommentSchema = gql`
    type NovelComment {
        novel_comment_id: ID!
        user_id: Int!
        novel_id: Int!
        episode_id: Int
        comment: String
        score: Int
        is_official_allow: Int
        is_publish: Int
        response_comment_id: Int
        created_at: String
        updated_at: String
        deleted_at: String
    }

    type Query {
        getNovelComment: [NovelComment]
        getNovelCommentById(novel_comment_id: ID!): NovelComment,
    }

    input NovelCommentInput {
        novel_comment_id: ID!
        user_id: Int!,
        novel_id: Int!, 
        episode_id: Int, 
        match_name: String, 
        score: Int, 
        is_official_allow: Int, 
        is_publish: Int,
        response_comment_id: Int
    }

    type Mutation {
        createNovelComment(
            user_id: Int!, 
            novel_id: Int!, 
            episode_id: Int, 
            comment: String, 
            score: Int, 
            is_official_allow: Int, 
            is_publish: Int,
            response_comment_id: Int,
        ): NovelComment
        updateNovelComment(updates: [NovelCommentInput!]!): [NovelComment]
        deleteNovelComment(novel_comment_id: ID!): NovelComment
    }
`

module.exports = {
    novelCommentSchema
};