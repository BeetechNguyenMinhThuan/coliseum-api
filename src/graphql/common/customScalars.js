const gql = require("graphql-tag");
const DateTime = gql`
    scalar DateTime
`;

module.exports = {
    DateTime
}