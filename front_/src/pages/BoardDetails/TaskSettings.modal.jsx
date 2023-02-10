import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { useTasksContext } from '../../hooks/useTasksContext'
import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

import formatDate from '../../utils/formatDate'

const TaskSettings = ({ task, toggle }) => {
  const { dispatch } = useTasksContext()
  const { tags: allTags } = useTagsContext()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [important, setImportant] = useState(task.important)
  const [tags, setTags] = useState(task.tags)
  // const [boardId, setBoardId] = useState(task.board_id)

  const [error, setError] = useState('')

  console.log(task);

  const updateTask = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`/tasks/${task._id}`, {
        title,
        description,
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

        <div className="create-list">
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </div>

        <Input
          type="checkbox"
          placeholder="Important"
          value={important}
          onChange={() => setImportant(!important)}
        />

        <div className="tags-input">
          {allTags.map(tag => (
            <Input
              key={tag._id}
              type="checkbox"
              placeholder={tag.title}
              // value={tags.includes({ ...tag })}
              value={tags.some(selected => (
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

      <Button type="delete" event={deleteTask}>Delete task</Button>

      <p>{formatDate(task.createdAt)}</p>
    </>
  )
}

TaskSettings.propTypes = {
  task: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(TaskSettings)