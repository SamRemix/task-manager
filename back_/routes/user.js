const { Router } = require('express')
const {
  signup,
  login,
  getUser
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.post('/signup', signup)

router.post('/login', login)

router.post('/', requireAuth, getUser)

module.exports = router