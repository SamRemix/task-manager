import { useNavigate } from 'react-router-dom'
import { useTasksContext } from '../contexts/TasksContext'
import axios from '../axios.config'

const useTasksRequests = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useTasksContext()

  const getTasks = async () => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get('/tasks')

      dispatch({ type: 'GET_TASKS', tasks: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  const getTask = async id => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.get(`/tasks/${id}`)

      dispatch({ type: 'GET_TASKS', tasks: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  const postTask = async (data, boardId) => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/tasks', data)

      dispatch({ type: 'CREATE_TASK', tasks: response.data })

      navigate(`/boards/${boardId}`)
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  const updateTask = async (id, data) => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.put(`/tasks/${id}`, data)

      dispatch({ type: 'UPDATE_TASK', tasks: response.data })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  const deleteTask = async id => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.delete(`/tasks/${id}`)

      dispatch({ type: 'DELETE_TASK', tasks: id })
    } catch (err) {
      dispatch({ type: 'ERROR', error: err.response.data.error })
    }
  }

  return { state, getTasks, getTask, postTask, updateTask, deleteTask }
}

export default useTasksRequests