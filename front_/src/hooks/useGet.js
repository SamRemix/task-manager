import { useReducer } from 'react'

import axios from '../axios.config'

const initialState = {
  loading: null,
  data: null,
  error: null
}

const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const getReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      }

    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const useGet = url => {
  const [state, dispatch] = useReducer(getReducer, initialState)

  const getData = async () => {
    dispatch({ type: LOADING })
    try {
      const response = await axios.get(url)

      dispatch({ type: SUCCESS, data: response.data })

    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  return {
    ...state,
    getData
  }
}

export default useGet