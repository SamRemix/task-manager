import { createContext, useReducer, useEffect, useContext } from 'react'

const initialState = {
  loading: null,
  user: null,
  error: null
}

const LOADING = 'LOADING'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ERROR = 'ERROR'

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        loading: true
      }

    case LOGIN:
      return {
        user: action.payload
      }

    case LOGOUT:
      return initialState

    case ERROR:
      return {
        loading: false,
        error: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) (
      dispatch({ type: 'LOGOUT' })
    )

    dispatch({ type: 'LOGIN', payload: user })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}