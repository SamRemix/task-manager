import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import SingleTask from '../SingleTask'

const TasksList = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <motion.div
        className="status to-do"
        {...config.toDoContainerAnimation}>
        <h2 className="to-do-name">To do</h2>
        <div className="to-do-container">
          {tasks.map(task => (
            task.status === 'To do' && (
              <SingleTask key={task._id} {...task} />
            )
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status in-progress"
        {...config.inProgressContainerAnimation}>
        <h2 className="in-progress-name">In progress</h2>
        <div className="in-progress-container">
          {tasks.map(task => (
            task.status === 'In progress' && (
              <SingleTask key={task._id} {...task} />
            )
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status done"
        {...config.doneContainerAnimation}>
        <h2 className="done-name">Done</h2>
        <div className="done-container">
          {tasks.map(task => (
            task.status === 'Done' && (
              <SingleTask key={task._id} {...task} />
            )
          ))}
        </div>
      </motion.div>
    </div>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default memo(TasksList)