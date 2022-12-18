import './styles.scss'

import PropTypes from 'prop-types'
import axios from '../../config'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import config from './motion.config'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDistanceToNowStrict } from 'date-fns'

import { TasksContext } from '../../context/TasksContext'

// import fr from 'date-fns/esm/locale/fr'
// format(new Date(task.createdAt), 'PPPPpppp', { locale: fr })

const Task = ({ _id, title, important, createdAt }) => {
  const { dispatchTasks } = useContext(TasksContext)
  const location = useLocation()

  const deleteTask = async id => {
    await axios.delete(`/tasks/${id}`)
    dispatchTasks({ type: 'DELETE_TASK', payload: id })
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`task-content ${important && 'important'}`}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <p className="task-title">{title}</p>
        <p className="updated-at"><i>{formatDistanceToNowStrict(new Date(createdAt))}</i></p>

        <div className="buttons">
          <Link to={`${location.pathname}/${_id}`}>
            <span className="material-symbols-outlined button button-details">description</span>
          </Link>
          <span className="material-symbols-outlined button button-delete" onClick={() => deleteTask(_id)}>delete</span>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

Task.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default Task