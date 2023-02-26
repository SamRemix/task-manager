import { memo } from 'react'
import PropTypes from 'prop-types'

import useFetch from '../../hooks/useFetch'
import useCursorContext from '../../hooks/useCursorContext'

import Button from '../../components/Button'

import { XMarkIcon } from '@heroicons/react/24/outline'

import formatDate from '../../utils/formatDate'

const DeleteTasks = ({ tasks, tasksIds, setTasksIds, toggle }) => {
  const { fetchData: deleteData } = useFetch({
    method: 'delete',
    url: `/tasks`,
    type: 'DELETE_MANY_TASK'
  })
  const { printItem, removeItem } = useCursorContext()

  return (
    <>
      <div className="modal-content">
        <h1 className="modal-content-title">Delete tasks</h1>
        <div className="selected">
          {tasks.map(({ _id, title, status, createdAt }) => (
            tasksIds.includes(_id) && (
              <div key={_id} className="selected-item">
                <p className="title">{title}</p>
                <p>{status}</p>
                <p>{formatDate(createdAt)}</p>
                <XMarkIcon
                  className="remove-item"
                  width="1.75em"
                  onClick={() => {
                    setTasksIds(ids => (
                      ids.filter(id => id !== _id)
                    ))
                    removeItem('Remove')
                  }}
                  onMouseEnter={() => printItem('Remove')}
                  onMouseLeave={() => removeItem('Remove')}
                />
              </div>
            )
          ))}
        </div>
      </div>

      <div className="modal-footer" style={{ flexDirection: 'row' }}>
        <Button
          type="delete"
          event={() => {
            deleteData({ data: { _ids: tasksIds } })
            setTasksIds([])
            toggle()
          }}>
          Delete {tasksIds.length} tasks
        </Button>

        <Button
          type="secondary"
          event={toggle}>
          Cancel
        </Button>
      </div>
    </>
  )
}

DeleteTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  tasksIds: PropTypes.array.isRequired,
  setTasksIds: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default memo(DeleteTasks)