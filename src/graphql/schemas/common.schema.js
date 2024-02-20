const { gql } = require("graphql-tag");
const commonSchema = gql`
  type ExportCSVSuccess {
    csvString: String
    fileName: String
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    exportCSV(modelName: String): ExportCSVSuccess
  }
`;

module.exports = {
  commonSchema,
};
