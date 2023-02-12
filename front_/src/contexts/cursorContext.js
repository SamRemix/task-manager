import { createContext, useReducer, useContext } from 'react'

const initialState = {
  items: [],
  printed: ''
}

const ADD = 'ADD'
const PRINT = 'PRINT'
const REMOVE = 'REMOVE'
const RESET = 'RESET'

const CursorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }

    case REMOVE:
      return {
        items: state.items.filter(item => (
          item !== action.payload
        )),
        printed: ''
      }

    case RESET:
      return {
        items: [],
        printed: ''
      }

    case PRINT:
      return {
        ...state,
        printed: action.payload
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