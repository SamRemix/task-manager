const { Router } = require('express')
const {
  // getUsers,
  getCurrentUser,
  updateUser
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

// router.get('/', getUsers)

router.get('/', getCurrentUser)

router.patch('/:id', updateUser)

module.exports = router