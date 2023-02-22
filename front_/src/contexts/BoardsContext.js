import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  boards: []
}

const GET_BOARDS = 'GET_BOARDS'
const ADD_BOARD = 'ADD_BOARD'
const DELETE_BOARD = 'DELETE_BOARD'
const UPDATE_BOARD = 'UPDATE_BOARD'

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return {
        boards: action.payload
      }

    case ADD_BOARD:
      return {
        boards: [action.payload, ...state.boards]
      }

    case UPDATE_BOARD:
      return {
        boards: state.boards.map(board => (
          board._id === action.payload._id ? { ...board, ...action.payload } : board
        ))
      }

    case DELETE_BOARD:
      return {
        boards: state.boards.filter(board => (
          board._id !== action.payload._id
        ))
      }

    default:
      throw new Error(`Unrecognized action type: ${action.type}`)
  }
}

export const BoardsContext = createContext(initialState)

export const BoardsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('Boards: ', memoizedState)

  return (
    <BoardsContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </BoardsContext.Provider>
  )
}