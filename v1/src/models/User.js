const { number } = require("joi");
const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    gsm: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

module.exports = Mongoose.model("user", UserSchema);
