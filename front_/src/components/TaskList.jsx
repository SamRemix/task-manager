import { motion } from 'framer-motion'
import TaskDetails from './TaskDetails'

const TaskList = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <motion.div
        className="status to-do"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
        exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
        <h2 className="task-status">To do</h2>
        {tasks.length > 0 && <div className="grid">
          {tasks.map(task => task.status === 'To do' && <TaskDetails task={task} key={task._id} />)}
        </div>}
      </motion.div>

      <motion.div
        className="status in-progress"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .4 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <h2 className="task-status">In progress</h2>
        {tasks.length > 0 && <div className="grid">
          {tasks.map(task => task.status === 'In progress' && <TaskDetails task={task} key={task._id} />)}
        </div>}
      </motion.div>

      <motion.div
        className="status done"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6, delay: .6 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <h2 className="task-status">Done</h2>
        {tasks.length > 0 && <div className="grid">
          {tasks.map(task => task.status === 'Done' && <TaskDetails task={task} key={task._id} />)}
        </div>}
      </motion.div>
    </div>
  )
}

export default TaskList