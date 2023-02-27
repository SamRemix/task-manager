import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  // users: [],
  user: null
}

const GET_USERS = 'GET_USERS'
const GET_CURRENT_USER = 'GET_CURRENT_USER'
const UPDATE_USER = 'UPDATE_USER'

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_USERS:
    //   return {
    //     ...state,
    //     users: action.payload
    //   }

    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      }

    case UPDATE_USER:
      return {
        ...state,
        user: state.user._id === action.payload._id ? (
          action.payload
        ) : state.user
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const UsersContext = createContext(initialState)

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('User', memoizedState.user)
  // console.log('Users', memoizedState.users)

  return (
    <UsersContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}