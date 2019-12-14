const Joi = require("@hapi/joi");

const loginValidationSchema =  Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
  });
module.exports = loginValidationSchema;
