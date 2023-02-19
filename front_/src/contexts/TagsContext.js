import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  tags: []
}

const LOADING = 'LOADING'
const GET_TAGS = 'GET_TAGS'
const CREATE_TAG = 'CREATE_TAG'
const DELETE_TAG = 'DELETE_TAG'
const UPDATE_TAG = 'UPDATE_TAG'
const ERROR = 'ERROR'

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }

    case GET_TAGS:
      return {
        loading: false,
        tags: action.payload,
        error: null
      }

    case CREATE_TAG:
      return {
        loading: false,
        tags: [action.payload, ...state.tags],
        error: null
      }

    case UPDATE_TAG:
      return {
        loading: false,
        tags: state.tags.map(tag => (
          tag._id === action.payload._id ? { ...tag, ...action.payload } : tag
        )),
        error: null
      }

    case DELETE_TAG:
      return {
        loading: false,
        tags: state.tags.filter(tag => (
          tag._id !== action.payload._id
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

export const TagsContext = createContext(initialState)

export const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tagsReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('Tags memoized state : ', memoizedState)

  return (
    <TagsContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </TagsContext.Provider>
  )
}
