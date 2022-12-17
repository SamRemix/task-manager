import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Task from './Task'

const Tasks = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <motion.div
        className="status to-do"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
        exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
        <h2 className="task-status">To do</h2>
        <div className="grid">
          {tasks.map(task => (
            task.status === 'To do' && <Task key={task._id} {...task} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status in-progress"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .4 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <h2 className="task-status">In progress</h2>
        <div className="grid">
          {tasks.map(task => (
            task.status === 'In progress' && <Task key={task._id} {...task} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="status done"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .6 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
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