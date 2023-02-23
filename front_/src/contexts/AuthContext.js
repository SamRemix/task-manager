import { createContext, useReducer, useEffect } from 'react'

const initialState = {
  token: ''
}

const SET_TOKEN = 'SET_TOKEN'
const LOGOUT = 'LOGOUT'

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.payload
      }

    case LOGOUT:
      return {
        token: ''
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return
    }

    dispatch({ type: 'SET_TOKEN', payload: token })
  }, [])

  console.log('Token: ', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}