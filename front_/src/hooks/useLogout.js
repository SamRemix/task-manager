import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { BoardsContext } from '../contexts/BoardsContext'

const useLogout = () => {
  const { dispatch: dispatchAuth } = useContext(AuthContext)
  const { dispatch: dispatchBoards } = useContext(BoardsContext)

  const navigate = useNavigate()

  const logout = () => {
    dispatchAuth({ type: 'LOGOUT' })
    dispatchBoards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('token')

    navigate('/login')
  }

  return { logout }
}

export default useLogout