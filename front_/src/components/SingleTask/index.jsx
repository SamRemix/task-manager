import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useHoverContext } from '../../contexts/HoverContext'
import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import capitalize from '../../utils/capitalize'
import formatDate from '../../utils/formatDate'

import { HiOutlineCheckBadge, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

const SingleTask = ({ _id, title, description, status, important, createdAt }) => {
  const { active, dispatch: disHover } = useHoverContext()
  const { dispatch } = useTasksContext()

  const updateStatus = async () => {
    const { data } = await axios.patch(`/tasks/${_id}`, {
      status: status === 'To do' ? 'In progress' : 'Done'
    })

    dispatch({ type: 'UPDATE_TASK', payload: data })
  }

  const deleteTask = async () => {
    const { data } = await axios.delete(`/tasks/${_id}`)

    dispatch({ type: 'DELETE_TASK', payload: data })
  }

  return (
    <>
      <motion.div
        className={important ? 'task-content-important' : 'task-content'}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <div className="task-content-infos">
          <p className="task-content-infos-title">{capitalize(title)}</p>
          {description?.includes('\n') ? (
            <ul className="task-content-infos-description-list">
              {description.split('\n').map((item, index) => (
                item.trim() && (
                  <li key={index} className="task-content-infos-description-list-item">
                    {capitalize(item)}
                  </li>
                )
              ))}
            </ul>
          ) : description && (
            <p className="task-content-infos-description">{capitalize(description)}</p>
          )}
        </div>

        <div className="task-content-footer">
          <p className="task-content-footer-date">{formatDate(createdAt)}</p>
          <p className='task-importance'>{important && 'high'}</p>
          {status !== 'Done' && (
            <div className="button"
              onMouseEnter={() => disHover({ type: 'ACTIVE', payload: status === 'To do' ? 'In progress' : 'Done' })}
              onMouseLeave={() => disHover({ type: 'DISACTIVE', payload: status === 'To do' ? 'In progress' : 'Done' })}>
              <HiOutlineCheckBadge size="1.4em" className="button-validate" onClick={updateStatus} />
            </div>
          )}

          <Link className="button" to={`/update-task/${_id}`}
            onMouseEnter={() => disHover({ type: 'ACTIVE', payload: 'Update' })}
            onMouseLeave={() => disHover({ type: 'DISACTIVE', payload: 'Update' })}>
            <HiOutlinePencilSquare size="1.4em" className="button-update" />
          </Link>

          <div className="button"
            onMouseEnter={() => disHover({ type: 'ACTIVE', payload: 'Delete' })}
            onMouseLeave={() => disHover({ type: 'DISACTIVE', payload: 'Delete' })}>
            <HiOutlineTrash size="1.4em" className="button-delete" onClick={deleteTask} />
          </div>
        </div>
      </motion.div>
    </>
  )
}

SingleTask.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default memo(SingleTask)