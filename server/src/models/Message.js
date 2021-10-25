const mongoose = require('../libs/Mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    message: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
