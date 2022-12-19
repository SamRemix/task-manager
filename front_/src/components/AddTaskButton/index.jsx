import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

const AddTaskButton = ({ board_id }) => {
  return (
    <motion.div
      className="add-task-link"
      {...config.addTaskButtonAnimation}>
      <Link to={`/add-task/${board_id}`}>
        <span className="material-symbols-outlined icon">playlist_add</span>
        <p className="title">Add Task</p>
      </Link>
    </motion.div>
  )
}

AddTaskButton.propTypes = {
  board_id: PropTypes.string.isRequired
}

export default memo(AddTaskButton)