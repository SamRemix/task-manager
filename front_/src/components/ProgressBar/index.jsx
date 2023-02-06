import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import { useHoverContext } from '../../contexts/HoverContext'

import setPercent from '../../utils/setPercent'

import { HiChevronDoubleDown } from 'react-icons/hi2'

const ProgressBar = ({ tasks }) => {
  const { active } = useHoverContext()

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

  return (
    <motion.div
      className="progress-bar"
      {...config.progressBarAnimation}>
      {toDoLength > 0 && (
        <div
          className={active.includes('To do') ? 'progress-bar-item active' : 'progress-bar-item disabled'}
          style={{ height: setPercent(toDoLength, tasks) + '%' }}>
          <p>{+setPercent(toDoLength, tasks).toFixed(1)}<span>%</span></p>

          <AnimatePresence>
            {active.includes('To do') && active.includes('In progress') && (
              <motion.div
                className="progress-bar-item-arrow"
                {...config.arrowAnimation}>
                <HiChevronDoubleDown size="2.25em" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {inProgressLength > 0 && (
        <div
          className={active.includes('In progress') ? 'progress-bar-item active' : 'progress-bar-item disabled'}
          style={{ height: setPercent(inProgressLength, tasks) + '%' }}>
          <p>{+setPercent(inProgressLength, tasks).toFixed(1)}<span>%</span></p>

          <AnimatePresence>
            {active.includes('In progress') && active.includes('Done') && (
              <motion.div
                className="progress-bar-item-arrow"
                {...config.arrowAnimation}>
                <HiChevronDoubleDown size="2.25em" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {doneLength > 0 && (
        <div
          className={active.includes('Done') ? 'progress-bar-item active' : 'progress-bar-item disabled'}
          style={{ height: setPercent(doneLength, tasks) + '%' }}>
          <p>{+setPercent(doneLength, tasks).toFixed(1)}<span>%</span></p>
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