import './styles.scss'

import { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useTagsContext from '../../hooks/useTagsContext'
import useCursorContext from '../../hooks/useCursorContext'

import SingleTask from '../SingleTask'
import Input from '../Input'

const TasksList = ({ tasks, event, setTaskId }) => {
  const { tags } = useTagsContext()
  const { addItem, removeItem } = useCursorContext()

  const [selectedTags, setSelectedTags] = useState([])
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  // useEffect(() => {
  //   setFilteredTasks(() => (
  //     selectedTags.length > 0 ? (
  //       tasks.filter(({ tags }) => (
  //         // tags.includes(selectedTags)
  //         tags.some(tag => selectedTags.includes(tag))
  //       ))
  //     ) : (
  //       tasks
  //     )
  //   ))

  //   console.log(filteredTasks, selectedTags);
  // }, [selectedTags])

  // console.log(filteredTasks, selectedTags);

  const setTasks = currStatus => (
    tasks.filter(({ status }) => (
      status === currStatus
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
      {/* <div className="tags-input">
        {tags.map(tag => (
          <Input
            key={tag._id}
            type="checkbox"
            placeholder={tag.title}
            value={selectedTags.some(({ _id }) => _id === tag._id)}
            onChange={() => {
              setSelectedTags(selectedTags.some(selected => selected === tag) ? (
                selectedTags.filter(({ _id }) => (
                  _id !== tag._id
                ))
              ) : [tag, ...selectedTags])

              setFilteredTasks(() => (
                selectedTags.length > 0 ? (
                  filteredTasks.filter(({ tags }) => (
                    tags.some(curr => curr === tag)
                  ))
                ) : tasks
              ))
            }}
          />
        ))}
      </div> */}

      {status.map(({ title, motionConfig }) => (
        <motion.div
          key={title}
          className="status"
          onMouseEnter={() => addItem(title)}
          onMouseLeave={() => removeItem(title)}
          {...motionConfig}>
          <h2 className="status-title">{title}</h2>
          <div className="status-container">
            {setTasks(title).map(task => (
              <SingleTask
                key={task._id}
                {...task}
                tags={task?.tags?.sort((a, b) => (
                  a.title < b.title ? -1 : a.title > b.title && 1
                ))}
                event={event}
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
  tasks: PropTypes.array.isRequired
}

export default memo(TasksList)