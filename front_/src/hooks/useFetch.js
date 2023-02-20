import { useState, useEffect, useReducer } from 'react'

import useAuthContext from './useAuthContext'
import { useBoardsContext } from './useBoardsContext'

import axios from '../axios.config'

const useFetch = ({ method, url, data = null, type }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const { token, user } = useAuthContext()
  const { dispatch: dispatchBoards } = useBoardsContext()

  const fetchData = async () => {
    try {
      const { data: res } = await axios[method](url, data)

      setResponse(res)
    } catch ({ response: res }) {
      setError(res.data.error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [method, url, data])

  useEffect(() => {
    if (response) {
      switch (url.split('/')[1]) {
        case 'user':
          return

        case 'boards':
          return dispatchBoards({ type: type, payload: response })

        case 'tasks':
          return

        default:
          return
      }
    } else if (error) {
      console.log(error)
    }
  }, [response, dispatchBoards, token, user])

  return { response, error }
}

export default useFetch