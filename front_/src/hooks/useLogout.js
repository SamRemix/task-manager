import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import { BoardsContext } from '../contexts/BoardsContext'
import { TasksContext } from '../contexts/TasksContext'
import { TagsContext } from '../contexts/TagsContext'

const useLogout = () => {
  const { dispatch: dispatchAuth } = useContext(AuthContext)
  const { dispatch: dispatchUser } = useContext(UserContext)
  const { dispatch: dispatchBoards } = useContext(BoardsContext)
  const { dispatch: dispatchTasks } = useContext(TasksContext)
  const { dispatch: dispatchTags } = useContext(TagsContext)

  const navigate = useNavigate()

  const logout = () => {
    dispatchAuth({ type: 'LOGOUT' })
    dispatchUser({ type: 'GET_CURRENT_USER', payload: null })
    dispatchBoards({ type: 'GET_BOARDS', payload: [] })
    dispatchTasks({ type: 'GET_TASKS', payload: [] })
    dispatchTags({ type: 'GET_TAGS', payload: [] })

    localStorage.removeItem('token')

    navigate('/login')
  }

  return { logout }
}

export default useLogout