import { memo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useTasksContext } from "../../hooks/useTasksContext"
import axios from '../../axios.config'

import { Form } from 'semantic-ui-react'

const UpdateTask = () => {
  let { task_id } = useParams()
  const navigate = useNavigate()

  const { dispatch } = useTasksContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [important, setImportant] = useState(null)
  const [boardId, setBoardId] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTask = async () => {

      setLoading(true)

      try {
        const { data } = await axios.get(`/tasks/${task_id}`)

        setTitle(data.title)
        setDescription(data.description)
        setImportant(data.important)
        setBoardId(data.board_id)

        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err.response.data.error)
      }
    }

    getTask()
  }, [])

  const update = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.patch(`/tasks/${task_id}`, {
        title,
        description,
        important
      })

      dispatch({ type: 'UPDATE_TASK', payload: data })

      navigate(`/boards/${boardId}`)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container">
      <Form onSubmit={update}>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            className={error ? 'title__input--error' : 'title__input'}
            value={error ? '' : title}
            onChange={e => {
              setError(false)
              setTitle(e.target.value)
            }}
            placeholder="Title"
            maxLength="36"
            autoFocus />
        </motion.div>

        <p className="title__input-remaining">
          {36 - title.length} remaining character{title.length < 35 && 's'}
        </p>

        <motion.div {...config.descriptionInputAnimation}>
          <Form.TextArea
            value={description}
            onChange={e => setDescription(e.target.value.replace(';', '\n'))}
            placeholder="Description (optional)">
          </Form.TextArea>
        </motion.div>

        <div className="create-list">
          <p>To create a list, use <b>;</b> between each item to separate them.</p>
        </div>

        <motion.div {...config.inputImportantAnimation}>
          <Form.Checkbox
            label="Important"
            className="important__checkbox"
            checked={important}
            onChange={() => setImportant(!important)} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Form.Button
            className="submit"
            content="Update task"
            loading={loading}
            secondary />
        </motion.div>
      </Form>
    </section>
  )
}

export default memo(UpdateTask)