import { createContext, useReducer, useEffect } from 'react'

const initialState = {
  token: '',
  user: null
}

const SET_TOKEN = 'SET_TOKEN'
const LOGIN = 'LOGIN'
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case LOGIN:
      return {
        ...state,
        user: action.payload
      }

    case LOGOUT:
      return {
        ...state,
        user: null
      }

    case UPDATE_USER:
      return {
        ...state,
        user: state.user._id === action.payload._id ? action.payload : state.user
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    if (!token) {
      return
    }

    dispatch({ type: 'SET_TOKEN', payload: token })
  }, [])

  console.log('Auth state : ', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}