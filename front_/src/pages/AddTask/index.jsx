import './styles.scss'

import { memo, useReducer } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import { Form } from 'semantic-ui-react'

const AddTask = () => {
  let { board_id } = useParams()
  const navigate = useNavigate()

  const { loading, error, dispatch } = useTasksContext()

  const SET_FIELD = 'SET_FIELD'
  const actionSetField = (name, value) => ({
    type: SET_FIELD, payload: {
      name,
      value
    }
  })

  const newTaskReducer = (state, action) => {
    switch (action.type) {
      case SET_FIELD:
        return {
          ...state,
          [action.payload.name]: action.payload.value
        }

      default:
        throw new Error('Action not recognized')
    }
  }

  const [newTask, dispatchNewTask] = useReducer(newTaskReducer, {
    title: '',
    description: '',
    status: 'To do',
    important: false,
    board_id
  })

  const addTask = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/tasks', newTask)

      dispatch({ type: 'CREATE_TASK', payload: response.data })

      navigate(`/boards/${board_id}`)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return (
    <section className="container">
      <Form onSubmit={addTask}>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            onChange={e => {
              dispatchNewTask(actionSetField('title', e.target.value))
            }}
            className={`title__input${error && ' error'}`}
            value={newTask.title}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="title__input-remaining">{36 - newTask.title.length} remaining character{newTask.title.length < 35 && 's'}</p>
        </motion.div>

        <motion.div {...config.descriptionInputAnimation}>
          <Form.TextArea
            onChange={e => {
              dispatchNewTask(actionSetField('description', e.target.value))
            }}
            value={newTask.description}
            placeholder="Description (optional)">
          </Form.TextArea>

          <div className="create-list">
            <p>You can create a list using <b>;</b> between each element to separate them.</p>
          </div>
        </motion.div>

        <motion.div {...config.inputImportantAnimation}>
          <Form.Checkbox
            label="Important"
            className="important__checkbox"
            onChange={e => {
              dispatchNewTask(actionSetField('important', !newTask.important))
            }}
            checked={newTask.important} />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Add task" secondary />
          ) : (
            <Form.Button className="submit" content="Add task" loading secondary />
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
    </section >
  )
}

export default memo(AddTask)