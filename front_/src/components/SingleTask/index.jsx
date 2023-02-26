import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useFetch from '../../hooks/useFetch'
import useCursorContext from '../../hooks/useCursorContext'

import Input from '../Input'

import { CheckBadgeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

import capitalize from '../../utils/capitalize'
import formatDate from '../../utils/formatDate'

const SingleTask = ({
  _id,
  title,
  description,
  status,
  important,
  tags,
  createdAt,
  toggleModal,
  setTaskId,
  tasksIds,
  setTasksIds,
  prefix,
  setPrefix
}) => {
  const { fetchData } = useFetch({
    method: 'patch',
    url: `/tasks/${_id}`,
    type: 'UPDATE_TASK'
  })
  const { addItem, removeItem, printItem } = useCursorContext()

  const nextStatus = status === 'To do' ? 'In progress' : 'Done'

  const updateStatus = () => {
    fetchData({ status: nextStatus })

    removeItem(nextStatus)
  }

  return (
    <motion.div
      className={important ? 'task-content-important' : 'task-content'}
      layoutId={_id}
      {...config.singleTaskAnimation}>

      <div className="task-content-infos">
        <div className="task-content-infos-title">
          {capitalize(title)}

          <Input
            type="checkbox"
            checked={tasksIds.includes(_id)}
            onChange={() => {
              setTasksIds(tasksIds.includes(_id) ? (
                tasksIds.filter(id => (
                  id !== _id
                ))
              ) : (
                [_id, ...tasksIds]
              ))
            }}
          />
        </div>
        {description?.includes('\n') ? (
          <ul className="task-content-infos-description-list">
            {description.split('\n').map((item, i) => (
              <li key={i} className="task-content-infos-description-list-item">
                {capitalize(item.trim())}
              </li>
            ))}
          </ul>
        ) : description && (
          <p className="task-content-infos-description">
            {capitalize(description)}
          </p>
        )}
        <div className="task-content-infos-tags">
          {tags.map(({ _id, title }) => (
            <p
              key={_id}
              className="tag"
              onClick={() => {
                setPrefix(prefix === `#${title}` ? '' : `#${title}`)

                printItem(prefix !== `#${title}` ? (
                  '<span>Reset</span> filter'
                ) : (
                  `Filter by <span>#${capitalize(title)}</span> tag`
                ))
              }}
              onMouseEnter={() => printItem(prefix === `#${title}` ? (
                '<span>Reset</span> filter'
              ) : (
                `Filter by <span>#${capitalize(title)}</span> tag`
              ))}
              onMouseLeave={() => {
                removeItem(`Filter by <span>#${capitalize(title)}</span> tag` || 'Reset filter')
              }}>
              <span>#</span>{capitalize(title)}
            </p>
          ))}
        </div>
      </div>

      <div className="task-content-footer">
        <p className="task-content-footer-date">{formatDate(createdAt)}</p>

        <p className='task-importance'>{important && 'high'}</p>

        {status !== 'Done' && (
          <div className="button"
            onMouseEnter={() => {
              printItem(`Switch to <span>${nextStatus}</span>`)
              addItem(nextStatus)
            }}
            onMouseLeave={() => removeItem(nextStatus)}>
            <CheckBadgeIcon width="1.5em" className="button-validate" onClick={updateStatus} />
          </div>
        )}

        <div
          className="button"
          onClick={() => {
            setTaskId(_id)
            toggleModal()
          }}
          onMouseEnter={() => printItem('Update')}
          onMouseLeave={() => removeItem('Update')}>
          <PencilSquareIcon width="1.5em" className="button-update" />
        </div>
      </div>
    </motion.div>
  )
}

SingleTask.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setTaskId: PropTypes.func.isRequired,
  tasksIds: PropTypes.array.isRequired,
  setTasksIds: PropTypes.func.isRequired,
  setPrefix: PropTypes.func.isRequired
}

export default memo(SingleTask)