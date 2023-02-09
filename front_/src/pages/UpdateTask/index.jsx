import { memo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useTasksContext } from '../../hooks/useTasksContext'
import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const UpdateTask = () => {
  let { task_id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useTasksContext()
  const { tags: allTags } = useTagsContext()

  setDocumentTitle('Update task')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [important, setImportant] = useState(null)
  const [tags, setTags] = useState([])
  const [boardId, setBoardId] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getTask = async () => {

      setLoading(true)

      try {
        const { data } = await axios.get(`/tasks/${task_id}`)

        setTitle(data.title)
        setDescription(data.description)
        setImportant(data.important)
        setTags(data.tags)
        setBoardId(data.board_id)

        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err.response.data.error)
      }
    }

    getTask()
  }, [])

  console.log(tags)

  const updateTask = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/tasks/${task_id}`, {
        title,
        description,
        important,
        tags
      })

      dispatch({ type: 'UPDATE_TASK', payload: data })

      navigate(`/boards/${boardId}`)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <section className="container">
      <Button type="back" />

      <form onSubmit={updateTask}>
        <motion.div {...config.titleInputAnimation}>
          <Input
            placeholder="Title"
            value={title}
            onChange={e => {
              setError('')
              setTitle(e.target.value)
            }}
            maxLength="36"
            focus={true}
            error={error}
          />
        </motion.div>

        <motion.div {...config.descriptionInputAnimation}>
          <Input
            type="textarea"
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value.replace(';', '\n'))}
          />
        </motion.div>

        <motion.div
          className="create-list"
          {...config.createListMessageAnimation}>
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </motion.div>

        <motion.div {...config.inputImportantAnimation}>
          <Input
            type="checkbox"
            placeholder="Important"
            value={important}
            onChange={() => setImportant(!important)}
          />
        </motion.div>

        <div className="tags-input">
          {allTags.map(tag => (
            <Input
              key={tag._id}
              type="checkbox"
              placeholder={tag.title}
              value={tags.includes(tag)}
              onChange={() => {
                setTags(tags.includes(tag) ? (
                  tags.filter(selected => (
                    selected._id !== tag._id
                  ))
                ) : (
                  [tag, ...tags]
                ))
              }} />
          ))}
        </div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">
            <p>Update task</p>
          </Button>
        </motion.div>
      </form>
    </section>
  )
}

export default memo(UpdateTask)