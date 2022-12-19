import './styles.scss'

import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

import { useAuthContext } from '../../hooks/useAuthContext'
import useGet from '../../hooks/useGet'

const TaskDetails = () => {
  let { task_id } = useParams()

  const { user } = useAuthContext()

  const { loading, data: task, error, getData: getTask } = useGet(`/tasks/${task_id}`)

  useEffect(() => {
    getTask()
  }, [user])

  if (!task) return

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        Task Details
      </motion.h1>

      <motion.div
        className="task-details"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, ease: 'easeOut' } }}
        exit={{ y: 80, opacity: 0, transition: { duration: .4, ease: 'easeOut' } }}>
        <h2 className="task-title">{task.title}</h2>
        {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}

        <div className="date">
          <p>Created: <span>{format(new Date(task.createdAt), 'PPPPpppp').split(' GMT')[0]}</span></p>
          {task.createdAt !== task.updatedAt && <p>Last update: <span>{format(new Date(task.updatedAt), 'PPPPpppp').split(' GMT')[0]}</span></p>}
        </div>
        <div className="buttons">
          <span className="material-symbols-outlined button button-edit">edit</span>
        </div>
      </motion.div>
    </section>
  )
}

// TaskDetails.propTypes = {
//   tasks: PropTypes.array.isRequired
// }

export default memo(TaskDetails)