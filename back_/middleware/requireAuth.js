const User = require('../models/userModel')
const { verify } = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Request isn\'t authorized' })
  }
}

module.exports = requireAuth