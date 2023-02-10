import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'
import { useTasksContext } from "../../hooks/useTasksContext"
import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import { HiOutlineCheckBadge, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

import capitalize from '../../utils/capitalize'
import formatDate from '../../utils/formatDate'

const SingleTask = ({ _id, title, description, status, important, tags, createdAt, event, setTaskId }) => {
  const { addItem, removeItem } = useCursorContext()
  const { dispatch } = useTasksContext()

  const nextStatus = status === 'To do' ? 'In progress' : 'Done'

  const updateStatus = async () => {
    const { data } = await axios.patch(`/tasks/${_id}`, {
      status: nextStatus
    })

    dispatch({ type: 'UPDATE_TASK', payload: data })

    removeItem(nextStatus)
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
            <motion.ul layoutId={`task-content-infos-description-list-${_id}`} className="task-content-infos-description-list"
              {...config.singleTaskAnimation}>
              {description.split('\n').map((item, index) => (
                item.trim() && (
                  <li key={index} className="task-content-infos-description-list-item">
                    {capitalize(item)}
                  </li>
                )
              ))}
            </motion.ul>
          ) : description && (
            <motion.p layoutId={`task-content-infos-description-${_id}`} className="task-content-infos-description"
              {...config.singleTaskAnimation}>{capitalize(description)}</motion.p>
          )}
          <div className="task-content-infos-tags">
            {tags && tags.map(({ _id, title }) => (
              <p key={_id} className="tag">{title}</p>
            ))}
          </div>
        </div>

        <div className="task-content-footer">
          <p className="task-content-footer-date">{formatDate(createdAt)}</p>
          <p className='task-importance'>{important && 'high'}</p>
          {status !== 'Done' && (
            <div className="button"
              onMouseEnter={() => addItem(nextStatus)}
              onMouseLeave={() => removeItem(nextStatus)}>
              <HiOutlineCheckBadge size="1.4em" className="button-validate" onClick={updateStatus} />
            </div>
          )}
          <div className="button" onClick={() => {
            setTaskId(_id)
            event()
          }}>
            <HiOutlinePencilSquare size="1.4em" className="button-update" />
          </div>

          {/* <Link className="button" to={`/update-task/${_id}`}
            onClick={resetItem}
            onMouseEnter={() => addItem('Update')}
            onMouseLeave={() => removeItem('Update')}>
            <HiOutlinePencilSquare size="1.4em" className="button-update" />
          </Link> */}

          {/* <div className="button"
            onMouseEnter={() => addItem('Delete')}
            onMouseLeave={() => removeItem('Delete')}>
            <HiOutlineTrash size="1.4em" className="button-delete" onClick={deleteTask} />
          </div> */}
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
  tags: PropTypes.array,
  createdAt: PropTypes.string.isRequired
}

export default memo(SingleTask)