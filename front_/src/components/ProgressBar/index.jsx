import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import setPercent from '../../utils/setPercent'

import { HiChevronDoubleDown } from 'react-icons/hi2'

const ProgressBar = ({ tasks }) => {
  const { items } = useCursorContext()

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

  const status = [{
    title: 'To do',
    statusLength: toDoLength,
    nextStatus: 'In progress'
  }, {
    title: 'In progress',
    statusLength: inProgressLength,
    nextStatus: 'Done'
  }, {
    title: 'Done',
    statusLength: doneLength
  }]

  return (
    <motion.div
      className="progress-bar"
      {...config.progressBarAnimation}>
      {status.map(({ title, statusLength, nextStatus }) => (
        statusLength > 0 && (
          <div
            key={title}
            className={items.includes(title) ? 'progress-bar-item active' : 'progress-bar-item disabled'}
            style={{ height: setPercent(statusLength, tasks) + '%' }}>
            <AnimatePresence>
              {setPercent(statusLength, tasks) >= 7 && (
                // show the percentage only when it's greater than or equal to 7% cause of height of this element
                <motion.p {...config.percentAnimation}>{+setPercent(statusLength, tasks).toFixed(1)}%</motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {items.includes(title) && items.includes(nextStatus) && setPercent(statusLength, tasks) >= 11 && (
                // show the arrow only when percentage it's greater than or equal to 11% to see it fully
                // (hidden by the p element above)
                <motion.div
                  className="progress-bar-item-arrow"
                  {...config.arrowAnimation}>
                  <HiChevronDoubleDown size="2.25em" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      ))}

      {tasks.length === 0 && <p className="no-tasks">NO TASKS</p>}
    </motion.div>
  )
}

ProgressBar.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default memo(ProgressBar)