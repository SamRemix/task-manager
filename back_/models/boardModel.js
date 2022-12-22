const mongoose = require('mongoose')

const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: false
  }],
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Board', boardSchema)