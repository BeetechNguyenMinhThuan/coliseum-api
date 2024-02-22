const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const allTypeDefs = require("./src/graphql/schemas/index.schema");
const allResolvers = require("./src/graphql/resolvers/index.resolver");
const { sequelize } = require("./src/models");
const AuthService = require("./src/services/authService");
const UserService = require("./src/services/userService");

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
  includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  introspection: true,
});
const openApolloServer = async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      try {
        let token = req.headers.authorization.split(" ")[1];
        if (token) {
          const user = UserService.getUserByToken(token);
          return { user };
        }
      } catch (error) {
        return error;
      }
    },
    listen: { port: 5000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

const checkConnectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

openApolloServer();
checkConnectDB();
