import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import useTasksContext from '../../hooks/useTasksContext'
import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ConfirmAndDelete from '../../components/ConfirmAndDelete'

import formatDate from '../../utils/formatDate'

const TaskSettings = ({ task, toggle }) => {
  const { dispatch } = useTasksContext()
  const { tags: allTags } = useTagsContext()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState(task.status)
  const [important, setImportant] = useState(task.important)
  const [tags, setTags] = useState(task.tags)

  const [error, setError] = useState('')

  const updateTask = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/tasks/${task._id}`, {
        title,
        description,
        status,
        important,
        tags
      })

      dispatch({ type: 'UPDATE_TASK', payload: data })

      toggle()
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  const deleteTask = async () => {
    const { data } = await axios.delete(`/tasks/${task._id}`)

    dispatch({ type: 'DELETE_TASK', payload: data })

    toggle()

    // removeItem('Delete')
  }

  return (
    <>
      <h1 className="modal-content-title">Task settings</h1>
      <form onSubmit={updateTask}>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => {
            setError('')
            setTitle(e.target.value)
          }}
          maxLength="36"
          focus={true}
          error={error}
        />

        <Input
          type="textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value.replace(';', '\n'))}
        />

        <div className="tips">
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </div>

        <div className="status-input">
          {['To do', 'In progress', 'Done'].map((curr, i) => (
            <Input
              key={i}
              type="radio"
              name="status"
              placeholder={curr}
              value={curr}
              checked={curr === status}
              onChange={e => {
                setStatus(e.target.value)
              }}
            />
          ))}
        </div>

        <Input
          type="checkbox"
          placeholder="Important"
          checked={important}
          onChange={() => setImportant(!important)}
        />

        <div className="tags-input">
          {allTags.map(tag => (
            <Input
              key={tag._id}
              type="checkbox"
              placeholder={tag.title}
              checked={tags.some(selected => (
                selected._id === tag._id
              ))}
              onChange={() => {
                setTags(tags.some(selected => (
                  selected._id === tag._id
                )) ? (
                  tags.filter(selected => (
                    selected._id !== tag._id
                  ))
                ) : (
                  [tag, ...tags]
                ))
              }}
            />
          ))}
        </div>

        <Button type="form-button">Update task</Button>
      </form>

      <ConfirmAndDelete context="task" event={deleteTask} />

      <div className="tips">
        <p>Created on {formatDate(task.createdAt)}</p>

        {task.createdAt !== task.updatedAt && (
          <p>Last update on {formatDate(task.updatedAt)}</p>
        )}
      </div>
    </>
  )
}

TaskSettings.propTypes = {
  task: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(TaskSettings)