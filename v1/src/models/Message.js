const Mongoose = require("mongoose");

const MessageSchema = new Mongoose.Schema(
  {
    sender: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    chatroomId: {
      type: Mongoose.Types.ObjectId,
      ref: "chatroom",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

MessageSchema.set("toObject", { virtuals: true });
MessageSchema.set("toJSON", { virtuals: true });

module.exports = Mongoose.model("message", MessageSchema);
