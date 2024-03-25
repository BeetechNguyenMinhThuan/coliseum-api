const { GraphQLError } = require("graphql");
const AuthService = require("./auth.service");

class UserService {
  static getUserByToken(token) {
    try {
      const user = AuthService.decodeJWT(token);
      if (!user) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return { user };
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserService;
