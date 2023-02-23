const Board = require('../models/boardModel')
const { Types } = require('mongoose')

const getBoards = async (req, res) => {
  const { _id } = req.user

  const boards = await Board.find({ user_id: _id }).sort({ favorite: -1, createdAt: -1 })

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

  if (!title.trim()) {
    return res.status(404).json({ error: 'Please fill in this field' })
    // return res.status(400).json({ error: 'Please fill in \'Title\' field' })
  }

  if (title.length > 24) {
    return res.status(404).json({ error: 'Title should not exceed 24 characters' })
  }

  try {
    const { _id } = req.user
    const board = await Board.create({ ...req.body, user_id: _id })

    res.status(200).json(board)
  } catch ({ message }) {
    res.status(404).json({ error: message })
  }
}

const updateBoard = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board, invalid id' })
  }

  if (!title.trim()) {
    return res.status(404).json({ error: 'Please fill in this field' })
    // return res.status(400).json({ error: 'Please fill in \'Title\' field' })
  }

  if (title.length > 24) {
    return res.status(404).json({ error: 'Title should not exceed 24 characters' })
  }

  const board = await Board
    .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

  if (!board) {
    return res.status(404).json({ error: 'No such board' })
  }

  res.status(200).json(board)
}

const deleteBoard = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such board, invalid id' })
  }

  const board = await Board.findOneAndDelete({ _id: id })

  if (!board) {
    return res.status(404).json({ error: 'No such board' })
  }

  res.status(200).json(board)
}

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
}