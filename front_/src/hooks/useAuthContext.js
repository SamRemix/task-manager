import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
  // useContext return the value of TaskContext (state & dispatch)
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside a AuthContextProvider')
  }

  return context
}