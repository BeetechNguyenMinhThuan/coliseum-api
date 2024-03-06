const AuthService = require("../../services/authService");
const authResolver = {
  Query: {
    login: async (parent, args, context) => {
      const res = AuthService.login(args);
      return res;
    },
    verifyToken: async (_, { token }) => {
      try {
        // Verify the token
        const data = AuthService.decodeJWT(token);
        return {
          success: true,
          message: "Token is valid",
        };
      } catch (error) {
        console.log(error.message);
        return {
          success: false,
          message: "Token is invalid",
        };
      }
    },
  },
};

module.exports = {
  authResolver,
};
