const Board = require('../models/boardModel')

const { Types } = require('mongoose')

const getBoards = async (req, res) => {
  const user_id = req.user._id
  const boards = await Board.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(boards)
}

const getBoard = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board, invalid id' })
  }

  const board = await Board.findById(id)
  // const board = await Board.findById(id).populate('tasks')

  if (!board) {
    return res.status(404).json({ error: 'No such board' })
  }

  res.status(200).json(board)
}

const createBoard = async (req, res) => {
  const { title } = req.body

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Please fill in \'Title\' field' })
  }

  if (title.length > 24) {
    return res.status(400).json({ error: 'Title should not exceed 24 characters' })
  }

  try {
    const user_id = req.user._id
    const board = await Board.create({ title, user_id })

    res.status(200).json(board)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateBoard = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board, invalid id' })
  }

  const board = await Board.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!board) {
    return res.status(400).json({ error: 'No such board' })
  }

  res.status(200).json(board)
}

const deleteBoard = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such board, invalid id' })
  }

  const board = await Board.findOneAndDelete({ _id: id })

  if (!board) {
    return res.status(400).json({ error: 'No such board' })
  }

  res.status(200).json(board)
}

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard
}