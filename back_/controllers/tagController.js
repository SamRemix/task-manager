// const Board = require('../models/boardModel')
const Tag = require('../models/tagModel')
const { Types } = require('mongoose')

const getTags = async (req, res) => {
  const { _id } = req.user

  const tags = await Tag.find({ user_id: _id }).sort({ title: 1 })

  res.status(200).json(tags)
}

const createTag = async (req, res) => {
  const { _id } = req.user
  const { title } = req.body

  if (!title || !title.trim()) {
    return res.status(404).json({ error: 'Please fill in this field' })
  }

  if (title.length > 24) {
    return res.status(404).json({ error: 'Title should not exceed 24 characters' })
  }

  try {
    const tag = await Tag.create({ title, user_id: _id })

    res.status(200).json(tag)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateTag = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid tag id in request params' })
  }

  if (!title.trim()) {
    return res.status(404).json({ error: 'Please fill in this field' })
  }

  if (title.length > 24) {
    return res.status(404).json({ error: 'Title should not exceed 24 characters' })
  }

  const tag = await Tag
    .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

  if (!tag) {
    return res.status(404).json({ error: 'No such tag' })
  }

  res.status(200).json(tag)
}

const deleteTag = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such tag, invalid id' })
  }

  const tag = await Tag.findOneAndDelete({ _id: id })

  if (!tag) {
    return res.status(404).json({ error: 'No such tag' })
  }

  res.status(200).json(tag)
}

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag
}