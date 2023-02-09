const { Schema, model } = require('mongoose')

module.exports = model('Task', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  important: {
    type: Boolean,
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
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