const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(3),
  password: Joi.string().min(2),
  gsm: Joi.array().items(
    Joi.string()
      .required()
      .pattern(new RegExp("^(5)([0-9]{2})([0-9]{3})s?([0-9]{2})s?([0-9]{2})$"))
  ),
});

const loginValidation = Joi.object({
  gsm: Joi.array().items(
    Joi.string()
      .required()
      .pattern(new RegExp("^(5)([0-9]{2})([0-9]{3})s?([0-9]{2})s?([0-9]{2})$"))
  ),
  password: Joi.string().required().min(2),
});

const updateValidation = Joi.object({
  name: Joi.string().required().min(3),
  gsm: Joi.array().items(
    Joi.string()
      .required()
      .pattern(new RegExp("^(5)([0-9]{2})([0-9]{3})s?([0-9]{2})s?([0-9]{2})$"))
  ),
  password: Joi.string().min(2),
});

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
};
