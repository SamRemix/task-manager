import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
// import { useTasksContext } from './useTasksContext'

export const useLogout = () => {
  const navigate = useNavigate()

  const { dispatch } = useAuthContext()
  // const { dispatch: tasksDispatch } = useTasksContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    // tasksDispatch({ type: 'SET_TASKS', payload: null })
    navigate('/')
  }

  return { logout }
}