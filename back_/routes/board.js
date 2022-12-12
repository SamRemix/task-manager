const express = require('express')
const {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
} = require('../controllers/boardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getBoards)

router.get('/:id', getBoard)

router.post('/', createBoard)

router.delete('/:id', deleteBoard)

router.patch('/:id', updateBoard)

module.exports = router