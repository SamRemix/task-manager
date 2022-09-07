import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDistanceToNowStrict, formatRelative } from 'date-fns'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Details = ({ task }) => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const deleteTask = async id => {
    if (!user) {
      return
    }

    const response = await fetch('/api/tasks/' + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json })
    }
  }

  const [visible, setVisible] = useState(false)

  const toggle = () => {
    !visible ? setVisible(true) : setVisible(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={
          (task.importance === 1 ? 'task-content high-importance' :
            task.importance === 2 ? 'task-content medium-importance' :
              'task-content low-importance') + (visible ? ' open' : '')
        }
        layoutId={task._id}
        animate={{ opacity: 1, transition: { duration: .4 } }}
        exit={{ opacity: 0 }}>
        <p className="task-title">{task.title}</p>
        <p className="created-at"><i>{formatDistanceToNowStrict(new Date(task.updatedAt))}</i></p>
        {visible && <div className="details">
          {/* {task.description.trim().length !== 0 && <p className="description">{task.description}</p>} */}
          {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}
          <div className="date">
            <p>Created: <span>{formatRelative(new Date(task.createdAt), new Date())}</span></p>
            {task.createdAt !== task.updatedAt && <p>Last updated: <span>{formatRelative(new Date(task.updatedAt), new Date())}</span></p>}
          </div>
        </div>}

        <div className="buttons">
          <span className="material-symbols-outlined button button-details" onClick={toggle}>description</span>
          <span className="material-symbols-outlined button button-delete" onClick={() => deleteTask(task._id)}>delete</span>
        </div>

        {/* {visible && <div className="task-details">
          <motion.div
            className="backdrop"
            onClick={toggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .4 } }}
            exit={{ opacity: 0, transition: { duration: .2 } }} />

          <motion.div
            className="content"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: .2, delay: .2, ease: 'easeOut' } }}
            exit={{ y: 80, opacity: 0, transition: { duration: .2 } }}>
            <span className="material-symbols-outlined button button-close" onClick={toggle}>close</span>
            <div className="title">
              <p>title:</p>
              <p>{task.title}</p>
            </div>

            <div className="description">
              <p>description:</p>
              {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}
            </div>

            <div className="created">
              <p>created at: </p>
              <p>{formatRelative(new Date(task.createdAt), new Date())}</p>
            </div>

            {task.createdAt !== task.updatedAt && <div className="updated">
              <p>updated at: </p>
              <p>{formatRelative(new Date(task.updatedAt), new Date())}</p>
            </div>}
          </motion.div>
        </div>} */}
      </motion.div>
    </AnimatePresence>
  )
}

export default Details