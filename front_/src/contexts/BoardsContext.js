import { createContext, useReducer, useContext } from 'react'

const initialState = {
  loading: null,
  boards: null,
  error: null
}

const LOADING = 'LOADING'
const GET_BOARDS = 'GET_BOARDS'
const CREATE_BOARD = 'CREATE_BOARD'
const DELETE_BOARD = 'DELETE_BOARD'
const UPDATE_BOARD = 'UPDATE_BOARD'
const ERROR = 'ERROR'

const boardsReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        loading: true
      }

    case GET_BOARDS:
      return {
        ...state,
        loading: false,
        boards: action.payload
      }

    case CREATE_BOARD:
      return {
        ...state,
        loading: false,
        boards: [
          ...state.boards,
          action.payload
        ]
      }

    case UPDATE_BOARD:
      return {
        ...state,
        loading: false,
        boards: state.boards.map(board => (
          board._id === action.payload._id ? action.payload : board
        ))
      }

    case DELETE_BOARD:
      return {
        ...state,
        loading: false,
        boards: state.boards.filter(board => {
          return board._id !== action.payload._id
        })
      }

    case ERROR:
      return {
        loading: false,
        error: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const BoardsContext = createContext()

export const BoardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, initialState)

  return (
    <BoardsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  )
}

export const useBoardsContext = () => {
  return useContext(BoardsContext)
}