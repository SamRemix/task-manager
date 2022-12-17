import { createContext, useReducer } from 'react'

export const BoardsContext = createContext()

export const boardsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BOARDS':
      return {
        ...state,
        boards: action.payload
      }

    case 'ADD_BOARD':
      return {
        ...state,
        boards: [
          ...state.boards,
          action.payload
        ]
      }

    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(board => (
          board.id === action.payload.id ? action.payload : board
        ))
      }

    case 'DELETE_BOARD':
      return {
        ...state,
        boards: state.boards.filter(board => (
          board.id !== action.payload
        ))
      }

    default:
      return state
  }
}

export const useBoardsReducer = () => {
  return useReducer(boardsReducer, {
    boards: []
  })
}