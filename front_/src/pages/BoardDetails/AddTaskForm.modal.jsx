import PropTypes from 'prop-types'
import { memo, useState, useReducer } from 'react'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import { Form } from 'semantic-ui-react'

const AddTaskForm = ({ board_id, setIsOpen }) => {
  const { dispatch } = useTasksContext()

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
    board_id
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const addTask = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const { data } = await axios.post('/tasks', newTask)

      dispatch({ type: 'CREATE_TASK', payload: data })

      setLoading(false)

      setIsOpen(false)
    } catch (err) {
      setLoading(false)
      setError(err.response.data.error)
    }
  }

  return (
    <Form onSubmit={addTask}>
      <Form.Input
        type="text"
        className={error ? 'title__input--error' : 'title__input'}
        value={error ? '' : newTask.title}
        onChange={e => {
          setError(false)
          dispatchNewTask(actionSetField('title', e.target.value))
        }}
        placeholder={error ? error : 'Title'}
        maxLength="36"
        autoFocus />

      <p className="title__input-remaining">
        {36 - newTask.title.length} remaining character{newTask.title.length < 35 && 's'}
      </p>

      <Form.TextArea
        value={newTask.description}
        onChange={e => {
          dispatchNewTask(actionSetField('description', e.target.value.replace(';', '\n')))
        }}
        placeholder="Description (optional)" />

      <div className="create-list">
        <p>To create a list, use <b>;</b> between each item to separate them.</p>
      </div>

      <Form.Checkbox
        label="Important"
        className="important__checkbox"
        checked={newTask.important}
        onChange={() => {
          dispatchNewTask(actionSetField('important', !newTask.important))
        }} />

      <Form.Button
        className="submit"
        content="Add task"
        loading={loading}
        secondary />
    </Form>
  )
}

AddTaskForm.propTypes = {
  board_id: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default memo(AddTaskForm)