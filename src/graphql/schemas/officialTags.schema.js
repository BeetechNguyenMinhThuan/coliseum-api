const {gql} = require("graphql-tag");

const officialTagSchema = gql`
    type OfficialTag {
        tag_id: ID!
        tag_ulid: String
        tag: String
        start_at: DateTime
        finish_at: DateTime
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }

    extend type Query {
        getOfficialTagById(tag_id: ID!): OfficialTag
        getAllOfficialTags: [OfficialTag]
    }

    extend type Mutation {
        createOfficialTag(tag_ulid: String, tag: String, start_at: DateTime, finish_at: DateTime): OfficialTag
        updateOfficialTag(tag_id: ID!, tag_ulid: String, tag: String, start_at: DateTime, finish_at: DateTime): OfficialTag
        deleteOfficialTag(tag_id: ID!): String
    }
`;

module.exports = {
    officialTagSchema,
};
