const {gql} = require("graphql-tag");

const officialBadgeSchema = gql`
    type OfficialBadge {
        badges_id: ID!
        badges_ulid: String
        badges_name: String
        badges_url: String
        start_at: DateTime
        finish_at: DateTime
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
     type Query {
        getOfficialBadgeById(badge: ID!): OfficialBadge
        getAllOfficialBadges: [OfficialBadge]
    }

     type Mutation {
        createOfficialBadge(badges_ulid: String, badges_name: String,badges_url: String, start_at: DateTime, finish_at: DateTime): OfficialBadge
        updateOfficialBadge(badges_id: ID!, badges_ulid: String, badges_name: String,badges_url:String, start_at: DateTime, finish_at: DateTime): OfficialBadge
        deleteOfficialBadge(badges_id: ID!): String
    }
`;

module.exports = {
    officialBadgeSchema
};
