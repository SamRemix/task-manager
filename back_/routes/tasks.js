const { Router } = require('express')
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

router.get('/', getTasks)

router.get('/:id', getTask)

router.post('/', createTask)

router.patch('/:id', updateTask)

router.delete('/:id', deleteTask)

module.exports = router