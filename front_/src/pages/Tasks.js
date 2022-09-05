import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTasksContext } from '../hooks/useTasksContext'

import ProgressBar from '../components/ProgressBar'
import TaskList from '../components/TaskList'

const Tasks = () => {
  // Get tasks value (tasks = null) and dispatch function
  const { tasks, dispatch } = useTasksContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        // Update tasks value with the dispatch function (tasks = payload)
        // dispatch({ action.type, action.payload })
        dispatch({ type: 'SET_TASKS', payload: json })
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user])

  const [prefix, setPrefix] = useState('')

  const search = data => {
    return data.filter(item => item.title.toLowerCase().startsWith(prefix.toLowerCase()))
  }

  return (
    <section className="container tasks-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Task Board
      </motion.h1>

      <motion.div
        className="add-task-link"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ x: -80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <Link to="/add-task">
          <span className="material-symbols-outlined icon">playlist_add</span>
          <p className="title">Add Task</p>
        </Link>
      </motion.div>

      {tasks && <ProgressBar tasks={tasks} />}

      <motion.div
        className="js-function"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .4, ease: 'easeOut' } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <div className="search">
          <input className="search-bar" placeholder="Search" onChange={e => setPrefix(e.target.value)} />
          <span className="material-symbols-outlined button icon-search">search</span>
        </div>
      </motion.div>

      {tasks && <div className="tasks-container">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .6, ease: 'easeOut' } }}
          exit={{ x: -80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
          <TaskList tasks={search(tasks.filter(task => task.status === 'To do'))} status='To do' classTitle="to-do" />
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .8, ease: 'easeOut' } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
          <TaskList tasks={search(tasks.filter(task => task.status === 'In progress'))} status='In progress' classTitle="in-progress" />
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: 1, ease: 'easeOut' } }}
          exit={{ x: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
          <TaskList tasks={search(tasks.filter(task => task.status === 'Done'))} status='Done' classTitle="done" />
        </motion.div>
        {/* <TaskList tasks={tasks.filter(task => task.status === '')} title='Error' /> */}
      </div>}
    </section >
  )
}

export default Tasks