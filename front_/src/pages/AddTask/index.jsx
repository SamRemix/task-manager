import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import axios from '../../config'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { TasksContext } from '../../context/TasksContext'

const TaskForm = ({ getTasks }) => {
  let { board_id } = useParams()

  const { dispatchTasks } = useContext(TasksContext)
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To do',
    importance: 3,
    board_id
  })

  const [error, setError] = useState(null)

  const addTask = async e => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    try {
      const response = await axios.post('/tasks', newTask)
      dispatchTasks({ type: 'ADD_BOARD', payload: response.data })
      getTasks()
      navigate(`/Tasks/${board_id}`)
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

      <form onSubmit={addTask}>
        <motion.div
          className="title-input"
          {...config.titleInputAnimation}>
          <input
            type="text"
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            value={newTask.title}
            className={error ? 'error' : ''}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="remaining">{36 - newTask.title.length} remaining character{newTask.title.length < 35 && 's'}</p>
        </motion.div>

        <motion.textarea
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          value={newTask.description}
          placeholder="Description (optional)"
          {...config.descriptionInputAnimation}>
        </motion.textarea>

        <motion.select
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          value={newTask.status}
          {...config.statusInputAnimation}>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </motion.select>

        <motion.div
          className="importance-select"
          {...config.importanceInputAnimation}>
          <p>Importance: </p>
          <select
            onChange={e => setNewTask({ ...newTask, importance: e.target.value })}
            value={newTask.importance}
          >
            <option value='3'>Low</option>
            <option value='2'>Medium</option>
            <option value='1'>High</option>
          </select>
        </motion.div>

        <motion.button
          {...config.submitButtonAnimation}>
          Add Task
        </motion.button>

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