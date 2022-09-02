const Task = require('../models/taskModel')

// Mongoose is an 'Object Data Modeling' library that allows us to use methods to read and write database documents
// it also gives a way to declare schemas to ensure a strict data structure
const { Types } = require('mongoose')

const getTasks = async (req, res) => {
  const user_id = req.user._id
  const tasks = await Task.find({ user_id }).sort({ importance: 1, createdAt: -1 })

  res.status(200).json(tasks)
}

const getTask = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such task, invalid id' })
  }

  const task = await Task.findById(Object(id))

  if (!task) {
    return res.status(404).json({ error: 'No such task' })
  }

  res.status(200).json(task)
}

const createTask = async (req, res) => {
  const { title, description, status, importance } = req.body

  let emptyFields = []

  if (!title || title.trim().length === 0) {
    emptyFields.push('title')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const user_id = req.user._id
    const task = await Task.create({ title, description, status, importance, user_id })
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

  const task = await Task.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

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