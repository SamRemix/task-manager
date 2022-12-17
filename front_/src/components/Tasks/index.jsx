import './styles.scss'

import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import config from './motion.config'

import Task from '../Task'

const Tasks = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <motion.div
        className="status to-do"
        {...config.toDoContainerAnimation}>
        <h2 className="task-status">To do</h2>
        <div className="grid">
          {tasks.map(task => (
            task.status === 'To do' && <Task key={task._id} {...task} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status in-progress"
        {...config.inProgressContainerAnimation}>
        <h2 className="task-status">In progress</h2>
        <div className="grid">
          {tasks.map(task => (
            task.status === 'In progress' && <Task key={task._id} {...task} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status done"
        {...config.doneContainerAnimation}>
        <h2 className="task-status">Done</h2>
        <div className="grid">
          {tasks.map(task => (
            task.status === 'Done' && <Task key={task._id} {...task} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default Tasks