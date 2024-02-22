const Joi = require("joi");

const loginSchema = async (data) => {
  const schema = Joi.object({
    account_id: Joi.string().min(3).max(50).trim().email().required().strict(),
    password: Joi.string().min(2).trim().required().strict(),
  });
  return await schema.validateAsync(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
};

module.exports = {
  loginSchema,
};
