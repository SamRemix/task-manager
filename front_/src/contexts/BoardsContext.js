import { createContext, useReducer } from 'react'

const initialState = {
  loading: null,
  boards: [],
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
        ...state,
        loading: true
      }

    case GET_BOARDS:
      return {
        loading: false,
        boards: action.payload,
        error: null
      }

    case CREATE_BOARD:
      return {
        loading: false,
        boards: [action.payload, ...state.boards],
        error: null
      }

    case UPDATE_BOARD:
      return {
        loading: false,
        boards: state.boards.map(board => (
          board._id === action.payload._id ? action.payload : board
        )),
        error: null
      }

    case DELETE_BOARD:
      return {
        loading: false,
        boards: state.boards.filter(board => (
          board._id !== action.payload._id
        )),
        error: null
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      throw new Error(`Unrecognized action type: ${action.type}`)
  }
}

export const BoardsContext = createContext()

export const BoardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, initialState)

  return (
    <BoardsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  )
}