import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import useFetch from '../../hooks/useFetch'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ConfirmAndDelete from '../../components/ConfirmAndDelete'

import formatDate from '../../utils/formatDate'

const TaskSettings = ({ task, toggle }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [currStatus, setCurrStatus] = useState(task.status)
  const [important, setImportant] = useState(task.important)
  const [currTags, setCurrTags] = useState(task.tags)

  const { tags, error, setError, fetchData: updateData } = useFetch({
    method: 'patch',
    url: `/tasks/${task._id}`,
    type: 'UPDATE_TASK'
  })
  const { fetchData: deleteData } = useFetch({
    method: 'delete',
    url: `/tasks/${task._id}`,
    type: 'DELETE_TASK'
  })

  const updateTask = e => {
    e.preventDefault()

    updateData({
      title,
      description,
      status: currStatus,
      important,
      tags: currTags
    })

    toggle()
  }

  const deleteTask = () => {
    deleteData()

    toggle()
  }

  return (
    <>
      <div className="modal-content">
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


          <div className="list-container">
            <p>Status:</p>
            <div className="list-container-input">
              {['To do', 'In progress', 'Done'].map((status, i) => (
                <Input
                  key={i}
                  type="radio"
                  name="status"
                  placeholder={status}
                  value={status}
                  checked={status === currStatus}
                  onChange={e => {
                    setCurrStatus(e.target.value)
                  }}
                />
              ))}
            </div>
          </div>

          <div className="item-container">
            <p>Important:</p>
            <div className="item-container-input">
              <Input
                type="checkbox"
                placeholder="Important"
                checked={important}
                onChange={() => setImportant(!important)}
              />
            </div>
          </div>

          <div className="list-container">
            <p>Tags:</p>
            <div className="list-container-input">
              {tags.map(tag => (
                <Input
                  key={tag._id}
                  type="checkbox"
                  placeholder={tag.title}
                  checked={currTags.some(selected => (
                    selected._id === tag._id
                  ))}
                  onChange={() => {
                    setCurrTags(currTags.some(selected => (
                      selected._id === tag._id
                    )) ? (
                      currTags.filter(selected => (
                        selected._id !== tag._id
                      ))
                    ) : (
                      [tag, ...currTags]
                    ))
                  }}
                />
              ))}
            </div>
          </div>

          <Button type="form-button">Update task</Button>
        </form>
      </div >

      <div className="modal-footer">
        <ConfirmAndDelete context="task" event={deleteTask} />

        <div className="tips">
          <p>Created on {formatDate(task.createdAt)}</p>

          {task.createdAt !== task.updatedAt && (
            <p>Last update on {formatDate(task.updatedAt)}</p>
          )}
        </div>
      </div>
    </>
  )
}

TaskSettings.propTypes = {
  task: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(TaskSettings)