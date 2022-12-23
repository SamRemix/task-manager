import { createContext, useReducer, useContext } from 'react'

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
        ...state,
        loading: false,
        boards: action.payload
      }

    case CREATE_BOARD:
      return {
        ...state,
        loading: false,
        boards: action.payload
      }

    case UPDATE_BOARD:
      return {
        ...state,
        loading: false,
        boards: action.payload
        // boards: state.boards.map(board => (
        //   board._id === action.payload._id ? action.payload : board
        // ))
      }

    case DELETE_BOARD:
      return {
        ...state,
        loading: false,
        boards: action.payload
        // boards: state.boards.filter(board => (
        //   board._id !== action.payload._id
        // ))
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

const BoardsContext = createContext()

export const BoardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardsReducer, initialState)
  console.log(state)

  return (
    <BoardsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BoardsContext.Provider>
  )
}

export const useBoardsContext = () => {
  const context = useContext(BoardsContext)

  if (!context) return

  return context
}