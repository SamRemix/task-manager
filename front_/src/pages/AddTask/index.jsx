import './styles.scss'

import PropTypes from 'prop-types'
import { useState, useReducer, useContext } from 'react'
import axios from '../../axios.config'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { TasksContext } from '../../context/TasksContext'
import PreviousButton from '../../components/PreviousButton'

const TaskForm = ({ getTasks }) => {
  let { board_id } = useParams()

  const { dispatchTasks } = useContext(TasksContext)
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const SET_FIELD = 'SET_FIELD'
  const actionSetField = (name, value) => ({
    type: SET_FIELD, payload: {
      name,
      value
    }
  })

  const RESET = 'RESET'
  const actionReset = () => ({
    type: RESET
  })

  const initialState = {
    title: '',
    description: '',
    status: 'To do',
    important: false,
    board_id
  }

  const newTaskReducer = (state, action) => {
    switch (action.type) {
      case SET_FIELD:
        return {
          ...state,
          [action.payload.name]: action.payload.value
        }
      case RESET:
        return initialState
      default:
        throw new Error('Action not recognized')
    }
  }

  const [newTask, dispatchNewTask] = useReducer(newTaskReducer, initialState)

  const [error, setError] = useState(null)

  const addTask = async e => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    try {
      const response = await axios.post('/tasks', newTask)

      dispatchTasks({ type: 'ADD_TASK', payload: response.data })

      getTasks()

      navigate(`/boards/${board_id}`)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Add Task
      </motion.h1>

      <PreviousButton path={`/boards/${board_id}`} />

      <form onSubmit={addTask}>
        <motion.div
          className="title__input"
          {...config.titleInputAnimation}>
          <input
            type="text"
            onChange={e => {
              dispatchNewTask(actionSetField('title', e.target.value))
            }}
            value={newTask.title}
            className={error && 'error'}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="title__input-remaining">{36 - newTask.title.length} remaining character{newTask.title.length < 35 && 's'}</p>
        </motion.div>

        <motion.textarea
          onChange={e => {
            dispatchNewTask(actionSetField('description', e.target.value))
          }}
          value={newTask.description}
          placeholder="Description (optional)"
          {...config.descriptionInputAnimation}>
        </motion.textarea>

        <motion.div
          className="inputs-container"
          {...config.inputsContainerAnimation}>
          <select
            onChange={e => {
              dispatchNewTask(actionSetField('status', e.target.value))
            }}
            value={newTask.status}>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="important__checkbox">
            <label className="important__checkbox-label">Important:
              <input
                type="checkbox"
                onChange={e => {
                  dispatchNewTask(actionSetField('important', e.target.checked))
                }}
                checked={newTask.important} />
            </label>
            <p className="important__checkbox-value">{String(newTask.important)}</p>
          </div>
        </motion.div>

        <motion.div
          className="buttons"
          {...config.submitButtonAnimation}>
          <button className="submit">
            Add Task
          </button>
          <div
            className="reset-fields"
            onClick={() => dispatchNewTask(actionReset())}>
            <p>Reset fields</p>
          </div>
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </form>
    </section>
  )
}

TaskForm.propTypes = {
  getTasks: PropTypes.func.isRequired
}

export default TaskForm