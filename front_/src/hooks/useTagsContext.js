import { useState, useContext } from 'react'

import { TagsContext } from '../contexts/TagsContext'

import axios from '../axios.config'

const useTagsContext = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { tags, dispatch } = useContext(TagsContext)

  const getTags = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get('/tags')

      dispatch({ type: 'GET_TAGS', payload: data })

      setLoading(false)
      setError(false)
    } catch ({ response }) {
      setLoading(false)
      setError(response.data.error)
    }
  }

  const createTag = async props => {
    // setLoading(true)

    try {
      const { data } = await axios.post('/tags', props)

      dispatch({ type: 'CREATE_TAG', payload: data })

      // setLoading(false)
      setError(false)
    } catch ({ response }) {
      // setLoading(false)
      setError(response.data.error)
    }
  }

  const deleteTag = async id => {
    const { data } = await axios.delete(`/tags/${id}`)

    dispatch({ type: 'DELETE_TAG', payload: data })

    // removeItem('Delete')
  }

  return { tags, error, setError, getTags, createTag, deleteTag, dispatch }
}

export default useTagsContext