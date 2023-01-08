import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useBoardsContext } from './useBoardsContext'
import axios from '../axios.config'

const useAuth = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useAuthContext()
  const { dispatch: dispatch_boards } = useBoardsContext()

  const signup = async (name, email, password) => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/user/signup', {
        name,
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: data })

      localStorage.setItem('user', JSON.stringify(data))

      navigate('/')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
    }
  }

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/user/login', {
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: data })

      localStorage.setItem('user', JSON.stringify(data))

      navigate('/')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch_boards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('user')

    navigate('/')
  }

  return { state, signup, login, logout }
}

export default useAuth