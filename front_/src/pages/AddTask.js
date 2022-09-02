import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [emptyFields, setEmptyFields] = useState([])

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
      setEmptyFields(json.emptyFields)
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
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Add Task
      </motion.h1>

      <motion.form
        onSubmit={createTask}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <input
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
          placeholder="Title"
          autoFocus />
        <textarea
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder="Description (optional)"></textarea>
        <select
          className={
            status === 'To do' ? 'to-do' :
              status === 'In progress' ? 'in-progress' :
                'done'
          }
          onChange={e => setStatus(e.target.value)}
          value={status}>
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="importance">
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
        </div>
        <button>Add Task</button>
        {error && <motion.p
          className="error-message"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: .2 } }}>
          {error}
        </motion.p>}
      </motion.form>
    </section>
  )
}

export default TaskForm