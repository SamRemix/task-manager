const User = require('../models/userModel')
const { Types } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const getCurrentUser = async (req, res) => {
  const { _id } = req.user

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: 'No such user, invalid id' })
  }

  const user = await User.findOne({ _id })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  })
}

const updateUser = async (req, res) => {
  const { _id } = req.user
  const { name, email, currentPassword, newPassword } = req.body

  // Success message to return if response is ok
  let success = ''

  console.log(req.body);

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: 'No such user, invalid id' })
  }

  if (name) {
    if (name.trim().length < 3) {
      return res.status(404).json({ error: 'Name must be at least 3 characters' })
    }

    success = 'Name successfully updated'
  }

  if (email) {
    const exists = await User.findOne({ email })
    console.log(exists);

    if (exists) {
      return res.status(404).json({ error: 'Email already in use' })
    }

    if (!isEmail(email)) {
      return res.status(404).json({ error: 'Email is not valid' })
    }

    success = 'Email successfully updated'
  }

  let hashPassword

  if (currentPassword && newPassword) {
    const user = await User.findOne({ _id })

    const match = await compare(currentPassword, user.password)

    console.log(match ? 'Current Password is good' : 'Current Password is NOT good')
    console.log(currentPassword, newPassword)

    if (!match) {
      return res.status(404).json({ error: 'Incorrect password' })
    }

    if (currentPassword === newPassword) {
      return res.status(404).json({ error: 'Passwords are the same' })
    }

    if (newPassword && !isStrongPassword(newPassword)) {
      return res.status(404).json({ error: 'New password isn\'t strong enough' })

    }

    const salt = await genSalt(10)
    hashPassword = await hash(newPassword, salt)

    success = 'Password successfully updated'
  }

  const user = await User.findOneAndUpdate({ _id }, { password: hashPassword, ...req.body }, { new: true })

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
    success
  })
}

module.exports = { getCurrentUser, updateUser }