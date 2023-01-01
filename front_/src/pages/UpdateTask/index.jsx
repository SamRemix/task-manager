import { memo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useTasksContext } from "../../hooks/useTasksContext"
import axios from '../../axios.config'

import { Loader, Form } from 'semantic-ui-react'

const UpdateTask = () => {
  let { task_id } = useParams()
  const navigate = useNavigate()

  const { loading, tasks: task, error, dispatch } = useTasksContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [important, setImportant] = useState(null)

  useEffect(() => {
    const getTask = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await axios.get(`/tasks/${task_id}`)

        dispatch({ type: 'GET_TASKS', payload: response.data })

        setTitle(response.data.title)
        setDescription(response.data.description)
        setImportant(response.data.important)
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    getTask()
  }, [task_id, dispatch])

  const newTask = { title, description, important }

  const updateTask = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.patch(`/tasks/${task_id}`, newTask)

      dispatch({ type: 'UPDATE_TASK', payload: response.data })

      navigate(`/boards/${task.board_id}`)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  // if (loading) {
  //   return (
  //     <section className="container">
  //       <Loader active content="Loading" />
  //     </section>
  //   )
  // }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container">
      <Form onSubmit={updateTask}>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            className={`title__input${error && ' error'}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="title__input-remaining">{36 - title.length} remaining character{title.length < 35 && 's'}</p>
        </motion.div>

        <motion.div {...config.descriptionInputAnimation}>
          <Form.TextArea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description (optional)">
          </Form.TextArea>
        </motion.div>

        <motion.div {...config.inputImportantAnimation}>
          <Form.Checkbox
            label="Important"
            className="important__checkbox"
            checked={important}
            onChange={() => setImportant(!important)} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Update Task" secondary />
          ) : (
            <Form.Button className="submit" content="Loading" loading secondary />
          )}
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </Form>
    </section>
  )
}

export default memo(UpdateTask)