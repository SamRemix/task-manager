const { Router } = require('express')
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteTasks
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

router.get('/:id', getTasks)

router.post('/', createTask)

router.patch('/:id', updateTask)

router.delete('/:id', deleteTask)

router.delete('/', deleteTasks)

module.exports = router