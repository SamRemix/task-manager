const User = require('../models/userModel')
const { sign, verify } = require('jsonwebtoken')
const { Types } = require('mongoose')

const createToken = _id => {
  return sign({ _id }, process.env.SECRET)
}

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
  const { token } = req.params

  // if (!Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: 'No such user, invalid id' })
  // }
  const { id } = verify(token, process.env.SECRET)

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  console.log(user);

  res.status(200).json(user)
}

module.exports = { signup, login, getUser }