const User = require('../models/userModel')
const { Types } = require('mongoose')
const { sign } = require('jsonwebtoken')
const { isEmail, isStrongPassword } = require('validator')

const createToken = id => (
  sign({ _id: id }, process.env.SECRET)
)

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)
    const token = createToken(user._id)

    res.status(200).json({ name, email, token, createdAt: user.createdAt, updatedAt: user.updatedAt })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.status(200).json({ name: user.name, email, token, createdAt: user.createdAt, updatedAt: user.updatedAt })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  const { _id } = req.user

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: 'No such user, invalid id' })
  }

  const user = await User.findOne({ _id })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

const updateUser = async (req, res) => {
  const { _id } = req.user
  const { name, email, password } = req.body

  if (name && name.trim().length < 3) {
    return res.status(404).json({ error: 'Name must be at least 3 characters' })
  }

  if (email) {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(404).json({ error: 'Email already in use' })
    }

    if (!isEmail(email)) {
      return res.status(404).json({ error: 'Email is not valid' })
    }
  }

  if (password && !isStrongPassword(password)) {
    return res.status(404).json({ error: 'Password isn\'t strong enough' })
  }

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: 'No such user, invalid id' })
  }

  const user = await User.findOneAndUpdate({ _id }, { ...req.body })

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

module.exports = { signup, login, getUser, updateUser }