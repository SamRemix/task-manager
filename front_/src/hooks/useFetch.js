import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { BoardsContext } from '../contexts/BoardsContext'
import { TasksContext } from '../contexts/TasksContext'
import { TagsContext } from '../contexts/TagsContext'

import axios from '../axios.config'

const useFetch = ({ method = null, url = null, params = null, type = null }) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { user, token, dispatch: dispatchAuth } = useContext(AuthContext)
  const { boards, dispatch: dispatchBoards } = useContext(BoardsContext)
  const { tasks, dispatch: dispatchTasks } = useContext(TasksContext)
  const { tags, dispatch: dispatchTags } = useContext(TagsContext)

  const fetchData = async (data = null) => {
    setLoading(true)

    try {
      const { data: res } = await axios[method](url, data, params)

      setResponse(res)

      setLoading(false)

      const dispatch = dispatch => (
        dispatch({ type: type, payload: res })
      )

      // set the dispatch function to use based on the url
      switch (url) {
        case '/auth/signup':
        case '/auth/login':
          dispatch(dispatchAuth)

          localStorage.setItem('token', res)

          navigate('/')

          return

        case '/user':
        case `/user/${res._id}`:
          return dispatch(dispatchAuth)

        case '/boards':
        case `/boards/${res._id}`:
          if (type === 'ADD_BOARD') {
            navigate(`/boards/${res._id}`)
          } else if (type === 'DELETE_BOARD') {
            navigate(`/`)
          }

          dispatch(dispatchBoards)
          return

        case '/tasks':
        case `/tasks/${params?.id || res._id}`:
          return dispatch(dispatchTasks)

        case '/tags':
        case `/tags/${res._id}`:
          return dispatch(dispatchTags)

        default:
          throw new Error(`Unrecognized URL: ${url}`)
      }
    } catch (err) {
      console.log(err);
      console.log(err.response?.data.error);
      setError(err.response?.data.error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && method === 'get') {
      fetchData()
    }
  }, [method, url, token])
  // }, [method, url, token, dispatchAuth, dispatchBoards, dispatchTasks, dispatchTags])

  return {
    boards,
    tasks,
    tags,
    loading,
    response,
    error,
    setError,
    fetchData
  }
}

export default useFetch