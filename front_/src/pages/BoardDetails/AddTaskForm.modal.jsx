import { memo, useReducer } from 'react'
import PropTypes from 'prop-types'

import useTasksContext from '../../hooks/useTasksContext'
import useTagsContext from '../../hooks/useTagsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Tips from '../../components/Tips'

const AddTaskForm = ({ board_id, toggle }) => {
  const { error, setError, addTask, dispatch } = useTasksContext()
  const { tags } = useTagsContext()

  const SET_FIELD = 'SET_FIELD'
  const actionSetField = (name, value) => ({
    type: SET_FIELD, payload: {
      name,
      value
    }
  })

  const newTaskReducer = (state, action) => {
    switch (action.type) {
      case SET_FIELD:
        return {
          ...state,
          [action.payload.name]: action.payload.value
        }

      default:
        throw new Error('Action not recognized')
    }
  }

  const [newTask, dispatchNewTask] = useReducer(newTaskReducer, {
    title: '',
    description: '',
    important: false,
    tags: [],
    board_id
  })

  const handleAddTask = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/tasks', newTask)

      dispatch({ type: 'CREATE_TASK', payload: data })

      toggle()
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  return (
    <>
      <h1 className="modal-content-title">Add task</h1>
      <form onSubmit={handleAddTask}>
        <Input
          placeholder="Title"
          value={newTask.title}
          onChange={e => {
            setError('')
            dispatchNewTask(actionSetField('title', e.target.value))
          }}
          maxLength="36"
          focus={true}
          error={error}
        />

        <Input
          type="textarea"
          placeholder="Description (optional)"
          value={newTask.description}
          onChange={e => {
            dispatchNewTask(actionSetField('description', e.target.value))
          }}
        />

        <Tips>
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </Tips>

        <Input
          type="checkbox"
          placeholder="Important"
          value={newTask.important}
          onChange={() => {
            dispatchNewTask(actionSetField('important', !newTask.important))
          }} />

        <div className="tags-input">
          {tags.map(({ _id, title }) => (
            <Input
              key={_id}
              type="checkbox"
              placeholder={title}
              value={newTask.tags.includes(_id)}
              onChange={() => {
                dispatchNewTask(actionSetField('tags', newTask.tags.includes(_id) ? (
                  newTask.tags.filter(tag => (
                    tag !== _id
                  ))
                ) : (
                  [_id, ...newTask.tags]
                )))
              }} />
          ))}
        </div>

        <Button type="form-button">Add task</Button>
      </form>
    </>
  )
}

AddTaskForm.propTypes = {
  board_id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(AddTaskForm)