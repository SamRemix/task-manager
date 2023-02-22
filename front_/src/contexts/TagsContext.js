import { createContext, useReducer, useMemo } from 'react'

const initialState = {
  tags: []
}

const GET_TAGS = 'GET_TAGS'
const ADD_TAG = 'ADD_TAG'
const DELETE_TAG = 'DELETE_TAG'
const UPDATE_TAG = 'UPDATE_TAG'

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS:
      return {
        tags: action.payload
      }

    case ADD_TAG:
      return {
        tags: [action.payload, ...state.tags]
      }

    case UPDATE_TAG:
      return {
        tags: state.tags.map(tag => (
          tag._id === action.payload._id ? action.payload : tag
        ))
      }

    case DELETE_TAG:
      return {
        tags: state.tags.filter(tag => (
          tag._id !== action.payload._id
        ))
      }

    default:
      throw new Error(`Unrecognized action type: ${action.type}`)
  }
}

export const TagsContext = createContext(initialState)

export const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tagsReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  console.log('Tags: ', memoizedState)

  return (
    <TagsContext.Provider value={{ ...memoizedState, dispatch }}>
      {children}
    </TagsContext.Provider>
  )
}
