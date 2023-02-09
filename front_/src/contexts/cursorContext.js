import { createContext, useReducer, useContext } from 'react'

const initialState = {
  items: []
}

const ADD = 'ADD'
const REMOVE = 'REMOVE'
const RESET = 'RESET'

const CursorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        items: [action.payload, ...state.items]
      }

    case REMOVE:
      return {
        items: state.items.filter(item => (
          item !== action.payload
        ))
      }

    case RESET:
      return {
        items: []
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const CursorContext = createContext(initialState)

export const CursorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CursorReducer, initialState)

  return (
    <CursorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CursorContext.Provider>
  )
}