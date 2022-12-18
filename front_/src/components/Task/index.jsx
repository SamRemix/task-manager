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
        className={`task__content ${important && 'important'}`}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <p className="task__content-title">{title}</p>
        <p className="task__content-date"><i>{formatDistanceToNowStrict(new Date(createdAt))}</i></p>

        <div className="task__content-buttons-container">
          {/* <div> */}
          <Link className="button" to={`${location.pathname}/${_id}`}>
            <span
              className="material-symbols-outlined button-details">
              description
            </span>
            <p className="button-title">Details</p>
          </Link>
          {/* </div> */}
          <div className="button">
            <span
              className="material-symbols-outlined button-delete"
              onClick={() => deleteTask(_id)}>
              delete
            </span>
            <p className="button-title">Delete</p>
          </div>
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