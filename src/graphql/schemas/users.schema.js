const { gql } = require("graphql-tag");

const userSchema = gql`
  type User {
    user_id: ID!
    user_uuid: String!
    name: String!
    s3_url: String!
    first_login_at: DateTime!
    last_login_at: DateTime!
    novel_like(
      pageNovelLike: Int
      limitNovelLike: Int
      userId: Int
    ): NovelLikePaginate
    novel_bookmark: [Novel]
    user_badges: [OfficialBadge]
    novelsPaginate(page: Int, limit: Int, userId: Int): NovelPagination
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
  }

  type NovelLikePaginate {
    novels: [Novel]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  input registerUserInput {
    user_uuid: String!
    name: String!
    s3_url: String!
    author:String!
    first_login_at: DateTime!
    last_login_at: DateTime!
  }

  type UserPagination {
    users: [User!]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    buffer: String!
  }
  type RegisterMutationResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }

  extend type Query {
    users: [User]
    user(userId: Int!): User
    userByUUID(userUUID: String!): User
    getUsersPaginate(page: Int, limit: Int): UserPagination
  }
  scalar Upload
  extend type Mutation {
    register(input: registerUserInput): RegisterMutationResponse!
    singleUpload(file: Upload!): File!
  }
`;

module.exports = {
  userSchema,
};
