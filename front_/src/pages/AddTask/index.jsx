import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import axios from '../../config'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthContext } from '../../hooks/useAuthContext'
import { BoardsContext } from '../../context/BoardsContext'

const TaskForm = ({ getTasks }) => {
  let { board_id } = useParams()

  const { dispatchBoards } = useContext(BoardsContext)
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('To do')
  const [importance, setImportance] = useState(3)

  const [error, setError] = useState(null)

  const addTask = async e => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = { title, description, status, importance, board_id }

    const response = await axios.post('/tasks', task)
    dispatchBoards({ type: 'ADD_BOARD', payload: response.data })
    getTasks()
    navigate(`/boards/${board_id}`)
  }

  return (
    <section className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .2 } }}
        exit={{ opacity: 0, transition: { duration: .2 } }}>
        Add Task
      </motion.h1>

      <form onSubmit={addTask}>
        <motion.div
          className="title-input"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .4 } }}>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={error ? 'error' : ''}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="remaining">{36 - title.length} remaining character{title.length < 35 && 's'}</p>
        </motion.div>

        <motion.textarea
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder="Description (optional)"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .1 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .3 } }}>
        </motion.textarea>

        <motion.select
          onChange={e => setStatus(e.target.value)}
          value={status}
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .2 } }}>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </motion.select>

        <motion.div
          className="importance-select"
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .3 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2, delay: .1 } }}>
          <p>Importance: </p>
          <select
            onChange={e => setImportance(e.target.value)}
            value={importance}
          >
            <option value='3'>Low</option>
            <option value='2'>Medium</option>
            <option value='1'>High</option>
          </select>
        </motion.div>

        <motion.button
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .4 } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .2 } }}>
          Add Task
        </motion.button>

        {error && <div
          className="error-message">
          <motion.p
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: .4 } }}
            exit={{ opacity: 0 }}>
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