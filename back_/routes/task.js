const express = require('express')
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')
// const getBoardId = require('../middleware/getBoardId')

// express.Router() function create a new router object to handle requests
const router = express.Router()

// Require auth for all task routes
router.use(requireAuth)
// router.use(getBoardId)

router.get('/', getTasks)

router.get('/:id', getTask)

router.post('/', createTask)

router.delete('/:id', deleteTask)

router.patch('/:id', updateTask)

module.exports = router