import './styles.scss'

import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useFetch from '../../hooks/useFetch'

import useCursorContext from '../../hooks/useCursorContext'

import SingleTask from '../SingleTask'
import Button from '../Button'

const TasksList = ({ tasks, toggleModal, setTaskId, prefix, setPrefix }) => {
  // selected tasks (delete many)
  const [taskIds, setTaskIds] = useState([])

  const { fetchData: deleteData } = useFetch({
    method: 'delete',
    url: `/tasks`,
    type: 'DELETE_MANY_TASK'
  })
  const { addItem, removeItem } = useCursorContext()

  const setTasks = currStatus => (
    tasks.filter(({ status }) => (
      status === currStatus
    )).sort((a, b) => (
      b.important - a.important
    ))
  )

  const status = [{
    title: 'To do',
    motionConfig: config.toDoContainerAnimation
  }, {
    title: 'In progress',
    motionConfig: config.inProgressContainerAnimation
  }, {
    title: 'Done',
    motionConfig: config.doneContainerAnimation
  }]

  return (
    <div className="tasks-container">
      <AnimatePresence>
        {taskIds.length > 0 && (
          <Button
            // type="delete"
            event={() => {
              deleteData({ data: { _ids: taskIds } })
            }}>
            Delete
          </Button>
        )}
      </AnimatePresence>

      {status.map(({ title, motionConfig }) => (
        <motion.div
          key={title}
          className="status"
          onMouseEnter={() => addItem(title)}
          onMouseLeave={() => removeItem(title)}
          {...motionConfig}>
          <h2 className="status-title">
            {title}
            {setTasks(title).length > 0 && (
              <span>{setTasks(title).length} {setTasks(title).length > 1 ? 'tasks' : 'task'}</span>
            )}
          </h2>

          <div className="status-container">
            <AnimatePresence>
              {setTasks(title).map(({ _id, ...rest }) => (
                <SingleTask
                  key={_id}
                  _id={_id}
                  {...rest}
                  tasks={tasks}
                  toggleModal={toggleModal}
                  setTaskId={setTaskId}
                  taskIds={taskIds}
                  setTaskIds={setTaskIds}
                  prefix={prefix}
                  setPrefix={setPrefix}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setTaskId: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  setPrefix: PropTypes.func.isRequired
}

export default memo(TasksList)