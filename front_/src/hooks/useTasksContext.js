import { TasksContext } from '../context/TasksContext'
import { useContext } from 'react'

export const useTasksContext = () => {
  // useContext return the value of TaskContext (state & dispatch)
  const context = useContext(TasksContext)

  if (!context) {
    throw Error('useTasksContext must be used inside a TasksContextProvider')
  }

  return context
}