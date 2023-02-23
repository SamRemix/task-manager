const User = require('../models/userModel')

const createToken = require('../utils/createToken')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)

    res.status(200).json(createToken(user._id))
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    res.status(200).json(createToken(user._id))
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = { signup, login }