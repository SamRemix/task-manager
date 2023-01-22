import { createContext, useReducer, useEffect } from 'react'

const initialState = {
  loading: null,
  user: null,
  error: null
}

const LOADING = 'LOADING'
const LOGIN = 'LOGIN'
const UPDATE_USER = 'UPDATE_USER'
const ERROR = 'ERROR'

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }

    case LOGIN:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: state.user._id === action.payload._id ? action.payload : state.user
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch({ type: 'LOADING' })

    dispatch({ type: 'LOGIN', payload: user })
  }, [])

  console.log('Auth state : ', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}