import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'
import config from './motion.config'

import { formatDistanceToNowStrict } from 'date-fns'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import { HiOutlineDocumentText, HiOutlineTrash } from 'react-icons/hi2'

const SingleTask = ({ _id, title, important, createdAt }) => {
  const location = useLocation()

  const { dispatch } = useTasksContext()

  const deleteTask = async () => {
    const response = await axios.delete(`/tasks/${_id}`)

    dispatch({ type: 'DELETE_TASK', payload: response.data })
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`task__content ${important && 'important'}`}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <p className="task__content-title">{title}</p>
        <p className="task__content-date">{formatDistanceToNowStrict(new Date(createdAt))}</p>

        <div className="task__content-buttons-container">
          <Link className="button" to={`${location.pathname}/${_id}`}>
            <HiOutlineDocumentText size="1.4em" className="button-details" />
            <p className="button-title">Details</p>
          </Link>
          <div className="button">
            <HiOutlineTrash size="1.4em" className="button-delete" onClick={deleteTask} />
            <p className="button-title">Delete</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

SingleTask.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default memo(SingleTask)