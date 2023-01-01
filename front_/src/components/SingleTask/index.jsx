import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'
import config from './motion.config'

import { formatDistanceToNowStrict } from 'date-fns'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import { HiCheckCircle, HiOutlineDocumentText, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

const SingleTask = ({ _id, title, description, status, important, createdAt }) => {
  const location = useLocation()

  const { dispatch } = useTasksContext()


  const updateStatus = async () => {
    const response = await axios.patch(`/tasks/${_id}`, {
      status: status === 'To do' ? 'In progress' : 'Done'
    })

    dispatch({ type: 'UPDATE_TASK', payload: response.data })
  }

  const deleteTask = async () => {
    const response = await axios.delete(`/tasks/${_id}`)

    dispatch({ type: 'DELETE_TASK', payload: response.data })
  }

  const setDate = date => (
    formatDistanceToNowStrict(new Date(date), { addSuffix: true })
  )

  return (
    <AnimatePresence>
      <motion.div
        className={`task__content${important ? ' important' : ''}`}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <div className="task__content-infos">
          <p className="task__content-infos-title">{title}</p>
          {description.trim().length !== 0 && <p className="task__content-infos-description">{description}</p>}
        </div>

        <div className="task__content-footer">
          <p className="task__content-date">{setDate(createdAt)}</p>
          {important ? (
            <p className="high-important-task">high</p>
          ) : (
            <p className="low-important-task">low</p>
          )}
          {status !== 'Done' && (
            <div className="button">
              <HiCheckCircle size="1.4em" className="button-validate" onClick={updateStatus} />
              <p className="button-title">{status === 'To do' ? 'In progress' : 'Done'}</p>
            </div>
          )}

          {/* <Link className="button" to={`${location.pathname}/${_id}`}>
            <HiOutlineDocumentText size="1.4em" className="button-details" />
            <p className="button-title">Details</p>
          </Link> */}

          <Link className="button" to={`/update-task/${_id}`}>
            <HiOutlinePencilSquare size="1.4em" className="button-update" />
            <p className="button-title">Update</p>
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
  status: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default memo(SingleTask)