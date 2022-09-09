import { motion } from 'framer-motion'

const ProgressBar = ({ tasks }) => {
  let toDo = []
  let inProgress = []
  let done = []

  // eslint-disable-next-line
  tasks.filter(task => {
    switch (task.status) {
      case 'To do':
        toDo.push(task)
        break

      case 'In progress':
        inProgress.push(task)
        break

      case 'Done':
        done.push(task)
        break

      default:
        break
    }
  })

  return (
    <motion.div
      className="progress-bar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: .6, delay: .2 } }}
      exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
      {toDo.length > 0 && <div
        className="percent percent-to-do"
        style={{ height: toDo.length / tasks.length * 100 + '%' }}>
        <p>{+(toDo.length / tasks.length * 100).toFixed(1)}<span>%</span></p>
      </div>}
      {inProgress.length > 0 && <div
        className="percent percent-in-progress"
        style={{ height: inProgress.length / tasks.length * 100 + '%' }}>
        <p>{+(inProgress.length / tasks.length * 100).toFixed(1)}<span>%</span></p>
      </div>}
      {done.length > 0 && <div
        className="percent percent-done"
        style={{ height: done.length / tasks.length * 100 + '%' }}>
        <p>{+(done.length / tasks.length * 100).toFixed(1)}<span>%</span></p>
      </div>}
    </motion.div>
  )
}

export default ProgressBar