const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const Review = require('../models/review');



const commentSchema = new Schema({
  content: {
    type: String,
    required: true
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
    comments: [commentSchema]
    
  }, {
    timestamps: true
  });



  module.exports = mongoose.model('Journal', journalSchema);