const { gql } = require("graphql-tag");

const contentSchema = gql`
  type Content {
    content_id: Int
    position_type: Int
    title: String
    content_url: String
    destination_url: String
    information_type: Int
    content: String
    sort_order: Int
    publication_start_at: String
    publication_finish_at: String
    created_at: String
    updated_at: String
    deleted_at: String
  }

  extend type Query {
    contentsBanner(type: Int!): [Content]
    contentsNoti(type: Int!): [Content]
    contentsAdvertisement(type: Int!): [Content]
  }
`;

module.exports = {
  contentSchema,
};
