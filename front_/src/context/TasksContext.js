import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload
      }

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => (
          task.id === action.payload.id ? action.payload : task
        ))
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => (
          task.id !== action.payload
        ))
      }

    default:
      return state
  }
}

export const useTasksReducer = () => {
  return useReducer(tasksReducer, {
    tasks: []
  })
}