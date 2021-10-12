const mongoose = require('../libs/Mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new mongoose.Schema(
   {
      user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      message: String,
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
