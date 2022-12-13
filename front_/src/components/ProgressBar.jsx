import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const ProgressBar = ({ tasks }) => {
  let [toDo, inProgress, done] = Array(3).fill(null)

  const getLength = type => {
    let status = {
      'To do': () => toDo++,
      'In progress': () => inProgress++,
      'Done': () => done++
    }
    return status[type]()
  }

  const setPercent = num => (
    +(num / tasks.length * 100)
  )

  tasks.forEach(({ status }) => {
    getLength(status)
  })

  return (
    <motion.div
      className="progress-bar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
      exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
      {toDo && <div
        className="percent percent-to-do"
        style={{ height: setPercent(toDo) + '%' }}>
        <p>{setPercent(toDo).toFixed(1)}<span>%</span></p>
      </div>}

      {inProgress && <div
        className="percent percent-in-progress"
        style={{ height: setPercent(inProgress) + '%' }}>
        <p>{setPercent(inProgress).toFixed(1)}<span>%</span></p>
      </div>}

      {done && <div
        className="percent percent-done"
        style={{ height: setPercent(done) + '%' }}>
        <p>{setPercent(done).toFixed(1)}<span>%</span></p>
      </div>}
    </motion.div>
  )
}

ProgressBar.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default ProgressBar