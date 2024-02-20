const { gql } = require("graphql-tag");

const authSchema = gql`
  type LoginResponse {
    token: String
  }

  type VerifyTokenResponse {
    success: Boolean!
    message: String
  }

  input LoginInput {
    account_id: String
    password: String
  }

  extend type Query {
    login(input: LoginInput!): LoginResponse
    verifyToken(token: String!): VerifyTokenResponse!
  }
`;

module.exports = {
  authSchema,
};
