const User = require('../models/userModel')
const { sign, verify } = require('jsonwebtoken')
// const { Types } = require('mongoose')

const createToken = id => (
  sign({ _id: id }, process.env.SECRET)
)

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)
    const token = createToken(user._id)

    res.status(200).json({ name, email, bio: user.bio, token, createdAt: user.createdAt })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.status(200).json({ name: user.name, email, bio: user.bio, token, createdAt: user.createdAt })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  const { _id } = req.user

  const user = await User.findOne({ user_id: _id })
  // const user = await User.findById(id).populate('boards')


  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

module.exports = { signup, login, getUser }