const Joi = require("@hapi/joi");

const registerValidationSchema = Joi.object({
  username: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(8)
    .required(),

  confirm_password: Joi.any()
    .valid(Joi.ref("password"))
    .required()
});

module.exports = registerValidationSchema;
