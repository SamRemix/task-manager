const { sign } = require('jsonwebtoken')

const createToken = _id => (
  sign({ _id }, process.env.SECRET)
)

module.exports = createToken