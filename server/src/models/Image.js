const mongoose = require('../libs/Mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema(
   {
      user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      name: String,
      size: Number,
      key: String,
      url: String,
   },
   {
      timestamps: {
         createdAt: 'createdAt',
         updatedAt: 'updatedAt',
      },
   }
);

ImageSchema.pre('save', function () {
   if (!this.url) {
      this.url = `http://localhost:4000/files/${this.key}`;
   }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
