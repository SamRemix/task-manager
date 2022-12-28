import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useBoardsContext } from "../hooks/useBoardsContext"
import axios from '../axios.config'

const useAuth = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useAuthContext()
  const { dispatch: dispatchBoards } = useBoardsContext()

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/user/login', {
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: response.data })

      localStorage.setItem('user', JSON.stringify(response.data))

      navigate('/')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  const signup = async (name, email, password) => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/user/signup', {
        name,
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: response.data })

      localStorage.setItem('user', JSON.stringify(response.data))

      navigate('/')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatchBoards({ type: 'GET_BOARDS', payload: null })
    navigate('/')
  }

  return { state, login, signup, logout }
}

export default useAuth