const { Schema, model } = require('mongoose')

module.exports = model('Tag', new Schema({
  title: {
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