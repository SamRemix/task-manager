const User = require('../models/userModel')
const { sign } = require('jsonwebtoken')

const createToken = id => (
  sign({ _id: id }, process.env.SECRET)
)

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)

    // return token
    res.status(200).json(createToken(user._id))
  } catch (error) {
    // return error message from User model
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // return token
    res.status(200).json(createToken(user._id))
  } catch (error) {
    // return error message from User model
    res.status(400).json({ error: error.message })
  }
}

module.exports = { signup, login }