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
            <p>{+setPercent(statusLength, tasks).toFixed(1)}<span>%</span></p>

            <AnimatePresence>
              {items.includes(title) && items.includes(nextStatus) && (
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