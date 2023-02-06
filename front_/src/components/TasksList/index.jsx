import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useHoverContext } from '../../contexts/HoverContext'

import SingleTask from '../SingleTask'

const TasksList = ({ tasks }) => {
  const { dispatch } = useHoverContext()

  return (
    <div className="tasks-container">
      <motion.div
        className="status"
        onMouseEnter={() => dispatch({ type: 'ACTIVE', payload: 'To do' })}
        onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'To do' })}
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
        onMouseEnter={() => dispatch({ type: 'ACTIVE', payload: 'In progress' })}
        onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'In progress' })}
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
        onMouseEnter={() => dispatch({ type: 'ACTIVE', payload: 'Done' })}
        onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'Done' })}
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