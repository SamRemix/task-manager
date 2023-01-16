const { Router } = require('express')
const {
  signup,
  login,
  getUser,
  updateUser
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/', requireAuth, getUser)

router.patch('/:id', requireAuth, updateUser)

module.exports = router