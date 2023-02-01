import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { useBoardsContext } from './useBoardsContext'

import axios from '../axios.config'

const useAuthQueries = () => {
  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const { loading, token, user, dispatch } = useContext(AuthContext)
  const { dispatch: dispatch_boards } = useBoardsContext()

  const signup = async args => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/auth/signup', args)

      dispatch({ type: 'SET_TOKEN', payload: data })

      localStorage.setItem('token', JSON.stringify(data))

      setError(false)

      navigate('/')
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  const login = async args => {
    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/auth/login', args)

      dispatch({ type: 'SET_TOKEN', payload: data })

      localStorage.setItem('token', JSON.stringify(data))

      setError(false)

      navigate('/')
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch_boards({ type: 'GET_BOARDS', payload: [] })

    localStorage.removeItem('token')

    navigate('/login')
  }

  return { loading, token, user, error, setError, signup, login, logout, dispatch }
}

export default useAuthQueries