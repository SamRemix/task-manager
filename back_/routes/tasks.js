const { Router } = require('express')
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')
// const getBoardId = require('../middleware/getBoardId')

// Router() function create a new router object to handle requests
const router = Router()

// Require auth for all task routes
router.use(requireAuth)
// router.use(getBoardId)

router.get('/:id', getTasks)

router.get('/:id', getTask)

router.post('/', createTask)

router.delete('/:id', deleteTask)

router.patch('/:id', updateTask)

module.exports = router