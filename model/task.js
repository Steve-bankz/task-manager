// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to User model
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  dueDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Task', taskSchema);
