// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
// import { useTasksContext } from '../hooks/useTasksContext'
// import { useAuthContext } from '../hooks/useAuthContext'

import Transition from '../components/Transition'


const TaskDetails = () => {
  // const { tasks: task, dispatch } = useTasksContext()
  // const { user } = useAuthContext()
  // const { id } = useParams()

  // const [error, setError] = useState(null)


  // useEffect(() => {
  //   const fetchTask = async () => {
  //     const response = await fetch('/api/tasks/' + id, {
  //       headers: { 'Authorization': `Bearer ${user.token}` }
  //     })
  //     const json = await response.json()

  //     if (!response.ok) {
  //       setError(json.error)
  //     }

  //     if (response.ok) {
  //       dispatch({ type: 'SET_TASKS', payload: json })
  //     }
  //   }

  //   if (user) {
  //     fetchTask()
  //   }
  // }, [dispatch, user, id])

  return (
    <motion.section
      className="container"
      initial={Transition.initial}
      animate={Transition.animate}
      exit={Transition.exit}>
      <p>test</p>
      {/* {task && <div>
        <h1>{task.title}</h1>
        {task.description && <p>{task.description}</p>}
      </div>}
      {error && <p>{error}</p>} */}
    </motion.section>
  )
}

export default TaskDetails