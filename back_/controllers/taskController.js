const Board = require('../models/boardModel')
const Task = require('../models/taskModel')

const { Types } = require('mongoose')

const getTasks = async (req, res) => {
  const user_id = req.user._id
  const tasks = await Task.find({ user_id }).sort({ important: -1, createdAt: -1 })

  res.status(200).json(tasks)
}

const getTask = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task, invalid id' })
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

const createTask = async (req, res) => {
  const { title, board_id } = req.body

  console.log(req.body);

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Please fill in \'Title\' field' })
  }

  if (title.length > 36) {
    return res.status(400).json({ error: 'Title should not exceed 36 characters' })
  }

  try {
    const user_id = req.user._id
    const task = await Task.create({ ...req.body, user_id })

    await Board.findByIdAndUpdate(board_id, {
      $push: {
        tasks: task._id
      }
    })

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such task, invalid id' })
  }

  const task = await Task.findOneAndDelete({ _id: id })

  if (!task) {
    return res.status(400).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task, invalid id' })
  }

  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!task) {
    return res.status(400).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}