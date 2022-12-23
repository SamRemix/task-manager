const { Schema, model } = require('mongoose')

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

module.exports = model('Board', boardSchema)