import { memo, useState, useReducer } from 'react'
import PropTypes from 'prop-types'

import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const AddTaskForm = ({ board_id, toggle }) => {
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

  const [error, setError] = useState('')

  const addTask = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/tasks', newTask)

      dispatch({ type: 'CREATE_TASK', payload: data })

      toggle(false)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <>
      <h1 className="modal-content-title">Add task</h1>
      <form onSubmit={addTask}>
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

        <div className="create-list">
          <p>To create a list, press <b>enter</b> after each item to separate them.</p>
        </div>

        <Input
          type="checkbox"
          placeholder="Important"
          value={newTask.important}
          onChange={() => {
            dispatchNewTask(actionSetField('important', !newTask.important))
          }} />

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