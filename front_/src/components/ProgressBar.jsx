import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const ProgressBar = ({ tasks }) => {
  let [toDo, inProgress, done] = Array(3).fill(0)

  tasks.forEach(({ status }) => {
    switch (status) {
      case 'To do':
        toDo++
        break
      case 'In progress':
        inProgress++
        break
      case 'Done':
        done++
        break
      default: break
    }
  })

  const setPercent = num => (
    +(num / tasks.length * 100)
  )

  return (
    <motion.div
      className="progress-bar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
      exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
      {toDo > 0 && <div
        className="percent percent-to-do"
        style={{ height: setPercent(toDo) + '%' }}>
        <p>{setPercent(toDo).toFixed(1)}<span>%</span></p>
      </div>}

      {inProgress > 0 && <div
        className="percent percent-in-progress"
        style={{ height: setPercent(inProgress) + '%' }}>
        <p>{setPercent(inProgress).toFixed(1)}<span>%</span></p>
      </div>}

      {done > 0 && <div
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