import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTasksContext } from '../hooks/useTasksContext'

import ProgressBar from '../components/ProgressBar'
import TaskList from '../components/TaskList'
// import TaskDetails from '../components/TaskDetails'

const TaskBoard = () => {
  const { tasks, dispatch } = useTasksContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({
          type: 'SET_TASKS',
          payload: json
        })
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user])

  const [prefix, setPrefix] = useState('')

  const search = data => {
    return data.filter(({ title }) => (
      title.toLowerCase().startsWith(prefix.toLowerCase())
    ))
  }

  return (
    <section className="container tasks-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Task Board
      </motion.h1>

      {!tasks && <p className="loading">Loading...</p>}

      <motion.div
        className="add-task-link"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
        <Link to="/add-task">
          <span className="material-symbols-outlined icon">playlist_add</span>
          <p className="title">Add Task</p>
        </Link>
      </motion.div>

      {/* {tasks && tasks.length >= 1 && <ProgressBar tasks={tasks} />} */}
      {tasks && <ProgressBar tasks={tasks} />}

      <motion.div
        className="js-function"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <div className="search">
          <input className="search-bar" placeholder="Search" onChange={e => setPrefix(e.target.value)} />
          <span className="material-symbols-outlined button icon-search">search</span>
        </div>
      </motion.div>

      {tasks && <TaskList tasks={search(tasks)} />}
    </section >
  )
}

export default TaskBoard