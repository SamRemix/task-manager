// Context allows access to data in any component
import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

// The state argument is the previous state before the change
// The action argument is the object passed in the dispatch function (action.type & action.payload)
export const tasksReducer = (state, action) => {
  // console.log(state.tasks, action)

  switch (action.type) {
    case 'SET_TASKS':
      return {
        tasks: action.payload
      }

    case 'CREATE_TASK':
      return {
        // action.payload is the new task that was just created
        // ...state.tasks represents the existing tasks
        tasks: [action.payload, ...state.tasks]
      }

    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter(task => task._id !== action.payload._id)
      }

    case 'UPDATE_TASK':
      const updatedTask = action.payload

      const updatedTasks = state.tasks.map(task => {
        if (task._id === updatedTask._id) {
          return updatedTask
        }
        return task
      })
      return {
        tasks: updatedTasks
      }

    default:
      // if case doesn't match return the state unchanged
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  // Update the state value with the dispatch function

  // The dispatch function as an object argument with 2 property :
  // - type property that describe the state change
  // - payload property represents an array of object with data that the component will access

  // Exemple:
  // { type: 'CREATE', payload: [{}, {}, ...] }
  // { type: 'UPDATE', payload: [{}, {}, ...] }
  const [state, dispatch] = useReducer(tasksReducer, { tasks: null })

  return (
    // children component will access to the state value and the dispatch function to update the state
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}