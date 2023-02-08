import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import SingleTask from '../SingleTask'

const TasksList = ({ tasks }) => {
  const { addItem, removeItem } = useCursorContext()

  return (
    <div className="tasks-container">
      <motion.div
        className="status"
        onMouseEnter={() => addItem('To do')}
        onMouseLeave={() => removeItem('To do')}
        {...config.toDoContainerAnimation}>
        <h2 className="status-name">To do</h2>
        <div className="status-container">
          {tasks.map(task => (
            task.status === 'To do' && (
              <SingleTask key={task._id} {...task} />
            )
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status"
        onMouseEnter={() => addItem('In progress')}
        onMouseLeave={() => removeItem('In progress')}
        {...config.inProgressContainerAnimation}>
        <h2 className="status-name">In progress</h2>
        <div className="status-container">
          {tasks.map(task => (
            task.status === 'In progress' && (
              <SingleTask key={task._id} {...task} />
            )
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status"
        onMouseEnter={() => addItem('Done')}
        onMouseLeave={() => removeItem('Done')}
        {...config.doneContainerAnimation}>
        <h2 className="status-name">Done</h2>
        <div className="status-container">
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