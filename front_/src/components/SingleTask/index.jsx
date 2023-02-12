import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'
import useTasksContext from "../../hooks/useTasksContext"
// import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import { HiOutlineCheckBadge, HiOutlinePencilSquare } from 'react-icons/hi2'

import capitalize from '../../utils/capitalize'
import formatDate from '../../utils/formatDate'

const SingleTask = ({ task, toggleModal, setTaskId }) => {
  const { addItem, removeItem, printItem } = useCursorContext()
  const { dispatch } = useTasksContext()

  const nextStatus = task.status === 'To do' ? 'In progress' : 'Done'

  const updateStatus = async () => {
    const { data } = await axios.patch(`/tasks/${task._id}`, {
      status: nextStatus
    })

    dispatch({ type: 'UPDATE_TASK', payload: data })

    removeItem(nextStatus)
  }

  return (
    <>
      <motion.div
        className={task.important ? 'task-content-important' : 'task-content'}
        layoutId={task._id}
        {...config.singleTaskAnimation}>

        <div className="task-content-infos">
          <p className="task-content-infos-title">{capitalize(task.title)}</p>
          {task.description?.includes('\n') ? (
            <ul className="task-content-infos-description-list">
              {task.description.split('\n').map((item, i) => (
                <li key={i} className="task-content-infos-description-list-item">
                  {capitalize(item.trim())}
                </li>
              ))}
            </ul>
          ) : task.description && (
            <p className="task-content-infos-description">
              {capitalize(task.description)}
            </p>
          )}
          <div className="task-content-infos-tags">
            {task.tags.map(({ _id, title }) => (
              <p
                key={_id}
                className="tag"
                onMouseEnter={() => printItem(`Filter by <span>#${capitalize(title)}</span> tag`)}
                onMouseLeave={() => removeItem(`Filter by <span>#${capitalize(title)}</span> tag`)}>
                <span>#</span>{capitalize(title)}
              </p>
            ))}
          </div>
        </div>

        <div className="task-content-footer">
          <p className="task-content-footer-date">{formatDate(task.createdAt)}</p>
          <p className='task-importance'>{task.important && 'high'}</p>
          {task.status !== 'Done' && (
            <div className="button"
              onMouseEnter={() => {
                printItem(`Switch to <span>${nextStatus}</span>`)
                addItem(nextStatus)
              }}
              onMouseLeave={() => removeItem(nextStatus)}>
              <HiOutlineCheckBadge size="1.4em" className="button-validate" onClick={updateStatus} />
            </div>
          )}
          <div
            className="button"
            onClick={() => {
              setTaskId(task._id)
              toggleModal()
            }}
            onMouseEnter={() => printItem('Update')}
            onMouseLeave={() => removeItem('Update')}>
            <HiOutlinePencilSquare size="1.4em" className="button-update" />
          </div>
        </div>
      </motion.div>
    </>
  )
}

SingleTask.propTypes = {
  task: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setTaskId: PropTypes.func.isRequired
}

export default memo(SingleTask)