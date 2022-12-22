import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import axios from '../axios.config'

const useLogin = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useAuthContext()

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/user/login', {
        email,
        password
      })

      dispatch({ type: 'LOGIN', payload: response.data })

      localStorage.setItem('user', JSON.stringify(response.data))

      navigate('/boards')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return { state, login }
}

export default useLogin