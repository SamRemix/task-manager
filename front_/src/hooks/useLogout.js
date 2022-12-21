import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export const useLogout = () => {
  const navigate = useNavigate()

  const { dispatch } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return { logout }
}