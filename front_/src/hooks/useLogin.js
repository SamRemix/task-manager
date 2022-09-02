import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const navigate = useNavigate()

  const { dispatch } = useAuthContext()

  const [error, setError] = useState(null)

  const login = async (email, password) => {
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({ type: 'LOGIN', payload: json })
      navigate('/tasks')
    }
  }

  return { login, error }
}