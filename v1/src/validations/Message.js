const Joi = require("joi");

const sendMessageValidation = Joi.object({
  sender: Joi.required().min(3),
  receiver: Joi.required().min(3),
  chatroomId: Joi.required(),
  content: Joi.string().required().min(1),
});

module.exports = {
  sendMessageValidation,
};
