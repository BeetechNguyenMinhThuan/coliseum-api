const { ApolloServerErrorCode } = require("@apollo/server/errors");
const { GraphQLError } = require("graphql");

const ErrorTypes = {
  BAD_USER_INPUT: {
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
  BAD_REQUEST: {
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400,
  },
  NOT_FOUND: {
    errorCode: "NOT_FOUND",
    errorStatus: 404,
  },
  UNAUTHENTICATED: {
    errorCode: "UNAUTHENTICATED",
    errorStatus: 401,
  },
  ALREADY_EXISTS: {
    errorCode: "ALREADY_EXISTS",
    errorStatus: 400,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
};

function throwCustomError(errorMessage, errorType) {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode,
      http: {
        status: errorType.errorStatus,
      },
    },
  });
}

//throwCustomError function
module.exports = {
  throwCustomError,
  ErrorTypes,
};
