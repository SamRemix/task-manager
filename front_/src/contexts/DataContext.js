import { useReducer, createContext, useContext } from 'react'

import axios from '../axios.config'

const initialState = {
  loading: null,
  data: null,
  error: null
}

const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

const dataReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }

    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      }

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  const getData = async url => {
    dispatch({ type: LOADING })
    try {
      const response = await axios.get(url)

      dispatch({ type: SUCCESS, data: response.data })

    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  const getSingleData = async (url, id) => {
    dispatch({ type: LOADING })
    try {
      const response = await axios.put(`${url}/${id}`)

      dispatch({ type: SUCCESS, data: response.data })
    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  const createData = async (url, data) => {
    dispatch({ type: LOADING })
    try {
      await axios.post(url, data)

      dispatch({ type: SUCCESS })

      getData()
    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  const updateData = async (url, id, data) => {
    dispatch({ type: LOADING })
    try {
      await axios.put(`${url}/${id}`, data)

      dispatch({ type: SUCCESS })

      getData()
    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    }
  }

  const deleteData = async (url, id) => {
    dispatch({ type: LOADING })
    try {
      await axios.delete(`${url}/${id}`)

      dispatch({ type: SUCCESS })

    } catch (err) {
      dispatch({ type: ERROR, error: err.response.data.error })
    } finally {
      getData(url)
    }
  }

  return (
    <DataContext.Provider
      value={{
        ...state,
        getData,
        getSingleData,
        createData,
        updateData,
        deleteData
      }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => {
  return useContext(DataContext)
}

export { DataProvider, useDataContext }