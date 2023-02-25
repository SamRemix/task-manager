import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  tasks: []
}

const GET_TASKS = 'GET_TASKS'
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const DELETE_MANY_TASK = 'DELETE_MANY_TASK'

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        tasks: action.payload
      }

    case ADD_TASK:
      return {
        tasks: [action.payload, ...state.tasks]
      }

    case UPDATE_TASK:
      return {
        tasks: state.tasks.map(task => (
          task._id === action.payload._id ? { ...task, ...action.payload } : task
        ))
      }

    case DELETE_TASK:
      return {
        tasks: state.tasks.filter(({ _id }) => (
          _id !== action.payload._id
        ))
      }

    case DELETE_MANY_TASK:
      return {
        tasks: state.tasks.filter(({ _id }) => (
          !action.payload.includes(_id)
        ))
      }

    default:
      throw new Error(`Unrecognized action type: ${action.type}`)
  }
}

export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('Tasks: ', memoizedState)

  return (
    <TasksContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

// export const useTasksContext = () => {
//   return useContext(TasksContext)
// }
