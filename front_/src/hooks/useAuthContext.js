import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { BoardsContext } from '../contexts/BoardsContext'

const useAuthContext = () => {
  const navigate = useNavigate()

  const { token, user, dispatch: dispatchAuth } = useContext(AuthContext)
  const { dispatch: dispatchBoards } = useContext(BoardsContext)

  const logout = () => {
    dispatchAuth({ type: 'LOGOUT' })
    dispatchBoards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('token')

    navigate('/login')
  }

  return { token, user, logout, dispatch: dispatchAuth }
}

export default useAuthContext