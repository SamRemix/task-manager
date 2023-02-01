import { createContext, useReducer, useEffect } from 'react'

const initialState = {
  loading: null,
  token: '',
  user: null,
  error: null
}

const LOADING = 'LOADING'
const SET_TOKEN = 'SET_TOKEN'
const LOGIN = 'LOGIN'
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'
const ERROR = 'ERROR'

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }

    case SET_TOKEN:
      return {
        ...state,
        loading: false,
        token: action.payload
      }

    case LOGIN:
      return {
        ...state,
        loading: false,
        user: action.payload
      }

    case LOGOUT:
      return {
        ...state,
        loading: false,
        user: null
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