import { createContext, useReducer, useContext } from 'react'

const initialState = {
  loading: null,
  tasks: null,
  error: null
}

const LOADING = 'LOADING'
const GET_TASKS = 'GET_TASKS'
const CREATE_TASK = 'CREATE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const ERROR = 'ERROR'

const tasksReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        loading: true
      }

    case GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      }

    case CREATE_TASK:
      return {
        ...state,
        loading: false,
        tasks: [
          { ...state.tasks },
          action.payload
        ]
      }

    case UPDATE_TASK:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task => (
          task._id === action.payload._id ? action.payload : task
        ))
      }

    case DELETE_TASK:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => (
          task._id !== action.payload._id
        ))
      }

    case ERROR:
      return {
        loading: false,
        error: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const TasksContext = createContext()

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => {
  return useContext(TasksContext)
}