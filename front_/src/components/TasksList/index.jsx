import './styles.scss'

import { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useTagsContext from '../../hooks/useTagsContext'
import useCursorContext from '../../hooks/useCursorContext'

import SingleTask from '../SingleTask'
import Input from '../Input'

const TasksList = ({ tasks, toggleModal, setTaskId }) => {
  const { tags } = useTagsContext()
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
            {setTasks(title).map(task => (
              <SingleTask
                key={task._id}
                task={task}
                tags={task.tags?.sort((a, b) => (
                  a.title < b.title ? -1 : a.title > b.title && 1
                ))}
                toggleModal={toggleModal}
                setTaskId={setTaskId}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default memo(TasksList)