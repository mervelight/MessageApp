const Joi = require("joi");

const createChatRoomValidation = Joi.object({
  users: Joi.array().required(),
  messages: Joi.array().required(),
});

module.exports = {
  createChatRoomValidation,
};
