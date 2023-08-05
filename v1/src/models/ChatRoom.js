const Mongoose = require('mongoose');

const ChatRoomSchema = new Mongoose.Schema(
  {
    users: [{
      type: Mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    }],
    messages: [{
      type: Mongoose.Types.ObjectId,
      ref: 'message'
    }]
  },
  { versionKey: false, timestamps: true }
);

ChatRoomSchema.set('toObject', { virtuals: true });
ChatRoomSchema.set('toJSON', { virtuals: true });

module.exports = Mongoose.model('chatroom', ChatRoomSchema);
