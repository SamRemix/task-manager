// const Board = require('../models/boardModel')
const Task = require('../models/taskModel')
const { Types } = require('mongoose')

const getTasks = async (req, res) => {
  const { id } = req.params
  const { _id } = req.user

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid board id in request params' })
  }

  const tasks = await Task
    .find({ user_id: _id, board_id: id })
    .sort({ important: -1, createdAt: -1 })
    .populate('tags', 'title')

  res.status(200).json(tasks)
}

const createTask = async (req, res) => {
  const { title } = req.body

  if (!title.trim()) {
    return res.status(404).json({ error: 'Please fill in this field' })
  }

  if (title.length > 36) {
    return res.status(404).json({ error: 'Title should not exceed 36 characters' })
  }

  try {
    const { _id } = req.user
    const task = await Task.create({
      ...req.body,
      status: 'To do',
      user_id: _id
    })

    const populatedTask = await task.populate('tags', 'title')

    res.status(200).json(populatedTask)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, status } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task, invalid id' })
  }

  if (!status) {
    if (!title.trim()) {
      return res.status(404).json({ error: 'Please fill in this field' })
    }

    if (title.length > 36) {
      return res.status(404).json({ error: 'Title should not exceed 36 characters' })
    }
  }

  const task = await Task
    .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    .populate('tags', 'title')

  if (!task) {
    return res.status(404).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task, invalid id' })
  }

  const task = await Task.findOneAndDelete({ _id: id })

  if (!task) {
    return res.status(404).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}