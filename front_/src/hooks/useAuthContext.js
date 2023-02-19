import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { useBoardsContext } from './useBoardsContext'

import axios from '../axios.config'

const useAuthContext = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { token, user, dispatch } = useContext(AuthContext)
  const { dispatch: dispatch_boards } = useBoardsContext()

  const signup = async props => {
    setLoading(true)

    try {
      const { data } = await axios.post('/auth/signup', props)

      dispatch({ type: 'SET_TOKEN', payload: data })

      localStorage.setItem('token', JSON.stringify(data))

      setLoading(false)
      setError(false)

      navigate('/')
    } catch ({ response }) {
      setLoading(false)
      setError(response.data.error)
    }
  }

  const login = async props => {
    setLoading(true)

    try {
      const { data } = await axios.post('/auth/login', props)

      dispatch({ type: 'SET_TOKEN', payload: data })

      localStorage.setItem('token', JSON.stringify(data))

      setLoading(false)
      setError(false)

      navigate('/')
    } catch ({ response }) {
      setLoading(false)
      setError(response.data.error)
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch_boards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('token')

    navigate('/login')
  }

  return { token, user, error, setError, signup, login, logout, dispatch }
}

export default useAuthContext