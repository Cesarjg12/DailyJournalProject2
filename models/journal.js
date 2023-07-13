const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const Review = require('../models/review');

  const journalSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    morningEntry: {
      type: String
    },
    noonEntry: {
      type: String
    },
    eveningEntry: {
      type: String
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Journal', journalSchema);