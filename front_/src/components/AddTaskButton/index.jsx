import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

import { HiOutlineDocumentPlus } from 'react-icons/hi2'

const AddTaskButton = ({ board_id }) => {
  return (
    <motion.div
      className="add-task-link"
      {...config.addTaskButtonAnimation}>
      <Link to={`/add-task/${board_id}`}>
        <HiOutlineDocumentPlus size="2em" className="button-add" />
        <p className="title">Add Task</p>
      </Link>
    </motion.div>
  )
}

AddTaskButton.propTypes = {
  board_id: PropTypes.string.isRequired
}

export default memo(AddTaskButton)