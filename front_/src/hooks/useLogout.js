import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useBoardsContext } from './useBoardsContext'

const useLogout = () => {
  const navigate = useNavigate()

  const { dispatch } = useAuthContext()
  const { dispatch: dispatch_boards } = useBoardsContext()

  const logout = () => {
    dispatch({ type: 'LOGIN', payload: null })
    dispatch_boards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('token')

    navigate('/')
  }

  return { logout }
}

export default useLogout