import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('To do')
  const [importance, setImportance] = useState('2')

  const [error, setError] = useState(null)

  const createTask = async e => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = { title, description, status, importance }

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      dispatch({ type: 'CREATE_TASK', payload: json })
      navigate('/tasks')
    }
  }

  return (
    <section className="container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .2 } }}
        exit={{ opacity: 0, transition: { duration: .2 } }}>
        Add Task
      </motion.h1>

      <form onSubmit={createTask}>
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
            maxLength="24"
            autoFocus />
          <p className="remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
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
          className={
            status === 'To do' ? 'to-do' :
              status === 'In progress' ? 'in-progress' :
                'done'
          }
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
            className={
              importance === '1' ? 'high-importance' :
                importance === '2' ? 'medium-importance' :
                  'low-importance'
            }
            onChange={e => setImportance(e.target.value)}
            value={importance}>
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
          {!user && <motion.div className="link"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: .4, delay: .1 } }}
            exit={{ opacity: 0 }}>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </motion.div>}
        </div>}
      </form>
    </section>
  )
}

export default TaskForm