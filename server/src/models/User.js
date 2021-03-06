const mongoose = require('../libs/Mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    bio: String,
    imageUrl: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
