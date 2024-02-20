const Joi = require("joi");

const createNewRound = async (data) => {
  const schema = Joi.object({
    round_name: Joi.string()
      .min(3)
      .max(30)
      // .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
      .required()
      .trim()
      .strict()
      .messages({
        "any.required": "Round name is required (nguyenthuan9999)",
      }),
    ulid: Joi.required().messages({
      'string.pattern.base': 'Round name must contain at least one uppercase letter, one digit, and one special character',
      "any.required": "ulid is required (nguyenthuan9999)",
    }),
    event_id: Joi.required(),
    round_start_at: Joi.string().isoDate(),
    round_type: Joi.number(),
  });
  return await schema.validateAsync(data, {
    abortEarly: false,
    allowUnknown: true, 
    stripUnknown: true, 
  });
};

module.exports = {
  createNewRound,
};
