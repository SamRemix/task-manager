import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import SingleTask from '../SingleTask'

const TasksList = ({ tasks, event, setTaskId }) => {
  const { addItem, removeItem } = useCursorContext()

  const status = [{
    title: 'To do',
    motionConfig: config.toDoContainerAnimation,
    tasks: tasks.filter(task => (
      task.status === 'To do'
    ))
  }, {
    title: 'In progress',
    motionConfig: config.inProgressContainerAnimation,
    tasks: tasks.filter(task => (
      task.status === 'In progress'
    ))
  }, {
    title: 'Done',
    motionConfig: config.doneContainerAnimation,
    tasks: tasks.filter(task => (
      task.status === 'Done'
    ))
  }]

  return (
    <div className="tasks-container">
      {status.map(({ title, motionConfig, tasks }) => (
        <motion.div
          key={title}
          className="status"
          onMouseEnter={() => addItem(title)}
          onMouseLeave={() => removeItem(title)}
          {...motionConfig}>
          <h2 className="status-title">{title}</h2>
          <div className="status-container">
            {tasks.map(task => (
              <SingleTask key={task._id} {...task} event={event} setTaskId={setTaskId} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default memo(TasksList)