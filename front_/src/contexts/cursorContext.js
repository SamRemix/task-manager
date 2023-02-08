import { createContext, useReducer, useContext } from 'react'

const initialState = {
  items: []
}

const ACTIVE = 'ACTIVE'
const DISACTIVE = 'DISACTIVE'

const CursorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE:
      return {
        items: [action.payload, ...state.items]
      }

    case DISACTIVE:
      return {
        items: state.items.filter(item => (
          item !== action.payload
        ))
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