const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
const Review = require('../models/review');
const User = require('../models/user');



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
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  }
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
    comments: [commentSchema],
    
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
    
  }, {
    timestamps: true
  });



  module.exports = mongoose.model('Journal', journalSchema);