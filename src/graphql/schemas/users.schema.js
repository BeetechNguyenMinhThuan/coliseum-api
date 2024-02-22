const { gql } = require("graphql-tag");

const userSchema = gql`
  type User {
    user_id: ID!
    user_uuid: String!
    name: String!
    s3_url: String!
    first_login_at: DateTime!
    last_login_at: DateTime!
    novel_like: [Novel]
    novel_bookmark: [Novel]
    user_badges: [OfficialBadge]
    created_at: DateTime
    updated_at: DateTime
    deleted_at: DateTime
  }

  input createUserInput {
    user_uuid: String!
    name: String!
    s3_url: String!
    first_login_at: DateTime!
    last_login_at: DateTime!
  }

  type UserPagination {
    users: [User!]
    totalItems: Int
    totalPages: Int
    currentPage: Int
  }

  type CreateUserMutationResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
  }

  extend type Query {
    getUsers: [User]
    author(user_id: Int!): User
    getUsersPaginate(page: Int, limit: Int): UserPagination
  }

  extend type Mutation {
    createUser(input: createUserInput): CreateUserMutationResponse!
  }
`;

module.exports = {
  userSchema,
};
