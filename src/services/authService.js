const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { throwCustomError, ErrorTypes } = require("../heplers/errorHandle");
const { loginSchema } = require("../validations/auth.validation");

class AuthService {
  static async login(args) {
    try {
      const { account_id, password } = args.input;

      // validate input data
      await loginSchema({ account_id, password });

      if (!account_id || !password) {
        throwCustomError(
          "Sai tai khoan hoac mat khau",
          ErrorTypes.BAD_USER_INPUT
        );
      }

      if (account_id !== "hello@gmail.com" || password !== "123") {
        throw new GraphQLError("Sai tai khoan hoac mat khau");
      }
      const token = jwt.sign(
        {
          id: 1,
          name: account_id,
          role: "admin",
          avatar:
            "https://suamayin115.vn/img_goc/%E1%BA%A2nh/111.%20tintuc/quna-ly-mau-sac-tren-photoshop-Goldmouse.jpg",
        },
        process.env.SECRET_KEY
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }
  static decodeJWT(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      throw new GraphQLError(err);
    }
  }
}
module.exports = AuthService;
