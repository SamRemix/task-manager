const { Schema, model } = require('mongoose')

module.exports = model('Board', new Schema({
  title: {
    type: String,
    required: true
  },
  // tasks: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Task',
  //   required: false
  // }],
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}))