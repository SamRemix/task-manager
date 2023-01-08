import { createContext, useReducer, useEffect } from 'react'

import axios from '../axios.config'

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
        ...state,
        loading: true
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

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // const getUser = async () => {
  //   dispatch({ type: 'LOADING' })

  //   try {
  //     const { data } = await axios.get('/user')

  //     console.log(data);

  //     dispatch({ type: 'LOGIN', payload: data })

  //     localStorage.setItem('user', JSON.stringify(data))
  //   } catch (err) {
  //     dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
  //   }
  // }

  useEffect(() => {
    dispatch({ type: 'LOADING' })

    try {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user) {
        dispatch({ type: 'LOGIN', payload: user })
      }
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
      console.log(err);
    }

    // getUser()

    // !user ? (
    //   dispatch({ type: 'LOGOUT' })
    // ) : (
    //   dispatch({ type: 'LOGIN', payload: user }) && getUser()
    // )
  }, [])

  console.log('Auth state : ', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}