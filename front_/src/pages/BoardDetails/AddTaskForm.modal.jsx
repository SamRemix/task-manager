import { memo, useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { TagsContext } from '../../contexts/TagsContext'

import useFetch from '../../hooks/useFetch'

import Input from '../../components/Input'
import Button from '../../components/Button'

const AddTaskForm = ({ board_id, toggle }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [important, setImportant] = useState(false)
  const [currTags, setCurrTags] = useState([])

  const { tags } = useContext(TagsContext)

  const { error, setError, fetchData } = useFetch({
    method: 'post',
    url: '/tasks',
    type: 'ADD_TASK'
  })

  const addTask = e => {
    e.preventDefault()

    fetchData({
      title,
      description,
      important,
      tags: currTags,
      board_id
    })

    toggle()
  }

  return (
    <div className="modal-content">
      <h1 className="modal-content-title">Add task</h1>
      <form onSubmit={addTask}>
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
          onChange={e => {
            setDescription(e.target.value)
          }}
        />

        <div className="tips">
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </div>

        <div className="item-container">
          <p>Important:</p>
          <div className="item-container-input">
            <Input
              type="checkbox"
              placeholder="Important"
              checked={important}
              onChange={() => {
                setImportant(!important)
              }}
            />
          </div>
        </div>

        <div className="list-container">
          <p>Tags:</p>
          <div className="list-container-input">
            {tags.map(({ _id, title }) => (
              <Input
                key={_id}
                type="checkbox"
                placeholder={title}
                checked={currTags.includes(_id)}
                onChange={() => {
                  setCurrTags(currTags.includes(_id) ? (
                    currTags.filter(tag => (
                      tag !== _id
                    ))
                  ) : (
                    [_id, ...currTags]
                  ))
                }}
              />
            ))}
          </div>
        </div>

        <Button type="form-button">Add task</Button>
      </form>
    </div>
  )
}

AddTaskForm.propTypes = {
  board_id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(AddTaskForm)