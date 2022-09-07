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

        <div className={visible ? 'details open' : 'details'}>
          <h2 className="task-title">{task.title}</h2>
          {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}
          <div className="date">
            <p>Created: <span>{formatRelative(new Date(task.createdAt), new Date())}</span></p>
            {task.createdAt !== task.updatedAt && <p>Last update: <span>{formatRelative(new Date(task.updatedAt), new Date())}</span></p>}
          </div>
          <span className="material-symbols-outlined button button-close" onClick={toggle}>close</span>
        </div>
        {visible && <div className="backdrop" onClick={toggle} />}

        <div className="buttons">
          <span className="material-symbols-outlined button button-details" onClick={toggle}>description</span>
          <span className="material-symbols-outlined button button-delete" onClick={() => deleteTask(task._id)}>delete</span>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

export default Details