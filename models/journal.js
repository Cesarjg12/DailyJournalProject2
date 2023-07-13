const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

  const journalSchema = new Schema({
    title: { type: String, required: true },
    morningEntry: String,
    noonEntry: String,
    eveningEntry: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Journal', journalSchema);