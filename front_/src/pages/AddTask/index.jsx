import './styles.scss'

import PropTypes from 'prop-types'
import { useState, useReducer, useContext } from 'react'
import axios from '../../axios.config'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { TasksContext } from '../../context/TasksContext'
import PreviousButton from '../../components/PreviousButton'

import usePost from '../../hooks/usePost'
import { Button } from 'semantic-ui-react'

const TaskForm = ({ getTasks }) => {
  let { board_id } = useParams()

  const { dispatchTasks } = useContext(TasksContext)
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const {
    data,
    loading,
    error,
    makePostRequest
  } = usePost('/tasks', `/boards/${board_id}`)

  const SET_FIELD = 'SET_FIELD'
  const actionSetField = (name, value) => ({
    type: SET_FIELD, payload: {
      name,
      value
    }
  })

  const initialState = {
    title: '',
    description: '',
    status: 'To do',
    important: false,
    board_id
  }

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

  const [newTask, dispatchNewTask] = useReducer(newTaskReducer, initialState)

  const addTask = async e => {
    e.preventDefault()

    if (!user) {
      return
    }

    makePostRequest(newTask)
  }

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Add Task
      </motion.h1>

      <PreviousButton path={`/boards/${board_id}`} />

      <form onSubmit={addTask}>
        <motion.div
          className="title__input"
          {...config.titleInputAnimation}>
          <input
            type="text"
            onChange={e => {
              dispatchNewTask(actionSetField('title', e.target.value))
            }}
            value={newTask.title}
            className={error && 'error'}
            placeholder="Title"
            maxLength="36"
            autoFocus />
          <p className="title__input-remaining">{36 - newTask.title.length} remaining character{newTask.title.length < 35 && 's'}</p>
        </motion.div>

        <motion.textarea
          onChange={e => {
            dispatchNewTask(actionSetField('description', e.target.value))
          }}
          value={newTask.description}
          placeholder="Description (optional)"
          {...config.descriptionInputAnimation}>
        </motion.textarea>

        <motion.div
          className="inputs-container"
          {...config.inputsContainerAnimation}>
          <select
            onChange={e => {
              dispatchNewTask(actionSetField('status', e.target.value))
            }}
            value={newTask.status}>
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="important__checkbox">
            <label className="important__checkbox-label">Important:
              <input
                type="checkbox"
                onChange={e => {
                  dispatchNewTask(actionSetField('important', e.target.checked))
                }}
                checked={newTask.important} />
            </label>
            <p className="important__checkbox-value">{String(newTask.important)}</p>
          </div>
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Button className="submit" primary>Add Task</Button>
          ) : (
            <Button className="submit" loading primary>Loading</Button>
          )}

        </motion.div>



        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </form>
    </section>
  )
}

TaskForm.propTypes = {
  getTasks: PropTypes.func.isRequired
}

export default TaskForm