const { Schema, model } = require('mongoose')

module.exports = model('Task', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    required: true
  },
  board_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}))