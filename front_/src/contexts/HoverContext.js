import { createContext, useReducer, useContext } from 'react'

const initialState = {
  active: ''
}

const ACTIVE = 'ACTIVE'
const DISACTIVE = 'DISACTIVE'

const HoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE:
      return {
        active: action.payload
      }

    case DISACTIVE:
      return {
        active: ''
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const HoverContext = createContext(initialState)

export const HoverProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HoverReducer, initialState)

  return (
    <HoverContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HoverContext.Provider>
  )
}

export const useHoverContext = () => (
  useContext(HoverContext)
)