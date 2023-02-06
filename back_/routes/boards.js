const { Router } = require('express')
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.use(requireAuth)

router.get('/', getBoards)

router.get('/:id', getBoard)

router.post('/', createBoard)

router.patch('/:id', updateBoard)

router.delete('/:id', deleteBoard)

module.exports = router