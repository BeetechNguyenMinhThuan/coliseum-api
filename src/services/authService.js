const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../constants/constants");
const { throwCustomError, ErrorTypes } = require("../heplers/errorHandle");

class AuthService {
  static login(args) {
    const { account_id, password } = args.input;
    if (!account_id || !password) {
      throw new GraphQLError("Dien account_id va mk");
    }
    if (account_id === "hello@gmail.com" && password === "123") {
      const token = jwt.sign(
        { id: 1, name: account_id, role: "admin" },
        JWT_KEY
      );
      return { token };
    }
    throwCustomError("Sai tai khoan hoac mat khau", ErrorTypes.BAD_USER_INPUT);
  }
  static decodeJWT(token) {
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = AuthService;
