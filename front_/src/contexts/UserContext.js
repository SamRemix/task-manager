import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  user: null
}

const GET_CURRENT_USER = 'GET_CURRENT_USER'
const UPDATE_USER = 'UPDATE_USER'

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        user: action.payload
      }

    case UPDATE_USER:
      return {
        user: state.user._id === action.payload._id ? (
          action.payload
        ) : state.user
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('User', memoizedState)

  return (
    <UserContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}