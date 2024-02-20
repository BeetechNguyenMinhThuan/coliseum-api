const {gql} = require("graphql-tag");
const novelSchema = gql`
    type Novel {
        novel_id: Int
        novel_ulid: String
        user_id: Int
        title: String
        synopsis: String
        cover_picture_url: String
        foreword_url: String
        afterword_url: String
        setting_url: String
        note_url: String
        dictionary_url: String
        is_anonymous: Boolean
        is_publish: Boolean
        is_ranking_visible: Boolean
        is_completed: Boolean
        is_comment: Boolean
        is_comment_publish: Boolean
        novel_tag: [OfficialTag]
        novel_badges: [OfficialBadge]
        novel_comments: [NovelComment]
        first_novel_publish_at: DateTime
        first_name_publish_at: DateTime
        first_completed_at: DateTime
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
    input NovelInput {
        novel_ulid: String
        user_id: Int
        title: String
        synopsis: String
        cover_picture_url: String
        foreword_url: String
        afterword_url: String
        setting_url: String
        note_url: String
        dictionary_url: String
        is_anonymous: Boolean
        is_publish: Boolean
        is_ranking_visible: Boolean
        is_completed: Boolean
        is_comment: Boolean
        is_comment_publish: Boolean
        first_novel_publish_at: String
        first_name_publish_at: String
        first_completed_at: String
    }
    type Query {
        novel(novel_id: Int!): Novel
        novels: [Novel]
    }

    type Mutation {
        createNovel(input: NovelInput!): Novel
        updateNovel(novel_id: Int!, input: NovelInput!): Novel
        deleteNovel(novel_id: Int!): String
    }

`;

module.exports = {
    novelSchema,
};