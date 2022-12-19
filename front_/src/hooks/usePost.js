import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.config'

const POST_REQUEST = 'POST_REQUEST'
const POST_SUCCESS = 'POST_SUCCESS'
const POST_ERROR = 'POST_ERROR'

const postReducer = (state, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      }

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const usePost = (url, path) => {
  const [state, dispatch] = useReducer(postReducer, {
    data: null,
    loading: null,
    error: null
  })

  const navigate = useNavigate()

  const makePostRequest = async data => {
    dispatch({ type: POST_REQUEST })
    try {
      const response = await axios.post(url, data)

      dispatch({ type: POST_SUCCESS, data: response.data })

      navigate(path)
    } catch (err) {
      dispatch({ type: POST_ERROR, error: err.response.data.error })
    }
  }

  return {
    ...state,
    makePostRequest
  }
}

export default usePost