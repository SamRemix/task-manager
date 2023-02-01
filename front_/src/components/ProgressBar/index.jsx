import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

const ProgressBar = ({ tasks, layoutId }) => {
  let [toDoLength, inProgressLength, doneLength] = Array(3).fill(0)

  tasks.forEach(({ status }) => {
    switch (status) {
      case 'To do':
        toDoLength++
        break
      case 'In progress':
        inProgressLength++
        break
      case 'Done':
        doneLength++
        break
      default: break
    }
  })

  const setPercent = num => (
    num / tasks.length * 100
  )

  return (
    <motion.div
      className="progress__bar"
      layoutId={layoutId}
      {...config.progressBarAnimation}>
      {toDoLength > 0 && (
        <div
          className="progress__bar-to-do"
          style={{ height: setPercent(toDoLength) + '%' }}>
          <p>{+setPercent(toDoLength).toFixed(1)}<span>%</span></p>
        </div>
      )}

      {inProgressLength > 0 && (
        <div
          className="progress__bar-in-progress"
          style={{ height: setPercent(inProgressLength) + '%' }}>
          <p>{+setPercent(inProgressLength).toFixed(1)}<span>%</span></p>
        </div>
      )}

      {doneLength > 0 && (
        <div
          className="progress__bar-done"
          style={{ height: setPercent(doneLength) + '%' }}>
          <p>{+setPercent(doneLength).toFixed(1)}<span>%</span></p>
        </div>
      )}

      {tasks.length === 0 && <p className="no-tasks">NO TASKS</p>}
    </motion.div>
  )
}

ProgressBar.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default memo(ProgressBar)