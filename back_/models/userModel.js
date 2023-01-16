const { Schema, model } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

module.exports = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  statics: {
    async signup(name, email, password) {
      const exists = await this.findOne({ email })

      if (exists) {
        throw Error('Email already in use')
      }

      if (!name || !email || !password) {
        throw Error('All fields must be filled')
      }

      if (name.trim().length < 3) {
        throw Error('Name must be at least 3 characters')
      }

      if (!isEmail(email)) {
        throw Error('Email is not valid')
      }

      if (!isStrongPassword(password)) {
        throw Error('Password isn\'t strong enough')
      }

      const salt = await genSalt(10)
      const hashPassword = await hash(password, salt)

      const user = await this.create({ name, email, password: hashPassword })

      return user
    },
    async login(email, password) {
      if (!email || !password) {
        throw Error('All fields must be filled')
      }

      const user = await this.findOne({ email })

      if (!user) {
        throw Error('Incorrect email')
      }

      const match = await compare(password, user.password)

      if (!match) {
        throw Error('Incorrect password')
      }

      return user
    }
  }
}, {
  timestamps: true
}))