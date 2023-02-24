import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { UserContext } from '../contexts/UserContext'
import { BoardsContext } from '../contexts/BoardsContext'
import { TasksContext } from '../contexts/TasksContext'
import { TagsContext } from '../contexts/TagsContext'

import useAxios from './useAxios'

// import axios from '../axios.config'
import axios from 'axios'

const useFetch = ({ method, url, params = null, type }) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { token, dispatch: dispatchAuth } = useContext(AuthContext)
  const { dispatch: dispatchUser } = useContext(UserContext)
  const { dispatch: dispatchBoards } = useContext(BoardsContext)
  const { dispatch: dispatchTasks } = useContext(TasksContext)
  const { dispatch: dispatchTags } = useContext(TagsContext)

  const { instance } = useAxios(token)

  const fetchData = async (data = null) => {
    setLoading(true)

    // const instance = axios.create({
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })

    try {
      const { data: result } = await instance[method](url, data, params)

      setResponse(result)

      const dispatch = dispatch => (
        dispatch({ type, payload: result })
      )

      return {
        auth: () => {
          dispatch(dispatchAuth)
          localStorage.setItem('token', result)

          navigate('/')
        },
        user: () => {
          dispatch(dispatchUser)
        },
        boards: () => {
          dispatch(dispatchBoards)

          return {
            post: () => {
              navigate(`/boards/${result._id}`)
            },
            delete: () => {
              navigate('/')
            }
          }[method]()
        },
        tasks: () => {
          dispatch(dispatchTasks)
        },
        tags: () => {
          dispatch(dispatchTags)
        }
      }[url.split('/')[1]]()
    } catch ({ response }) {
      setError(response?.data.error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && method === 'get') {
      fetchData()
    }
  }, [method, url, token])

  return { loading, response, error, setError, fetchData }
}

export default useFetch