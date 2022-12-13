import { createContext, useReducer } from 'react'

export const BoardsContext = createContext()

export const boardsReducer = (state, action) => {
  console.log(action)

  switch (action.type) {
    case 'SET_BOARDS':
      return {
        boards: action.payload
      }

    case 'CREATE_BOARD':
      return {
        boards: [action.payload, ...state.boards]
      }

    case 'DELETE_BOARD':
      return {
        boards: state.boards.filter(({ _id }) => _id !== action.payload._id)
      }

    case 'UPDATE_BOARD':
      const updatedBoard = action.payload

      const updatedBoards = state.boards.map(board => {
        if (board._id === updatedBoard._id) {
          return updatedBoard
        }
        return board
      })
      return {
        boards: updatedBoards
      }

    default:
      return state
  }
}

export const BoardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, { boards: null })

  return (
    <BoardsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  )
}