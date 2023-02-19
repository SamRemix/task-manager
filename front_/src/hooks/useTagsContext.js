import { useState, useContext } from 'react'

import { TagsContext } from '../contexts/TagsContext'

import axios from '../axios.config'

const useTagsContext = () => {
  const [error, setError] = useState('')

  const { tags, dispatch } = useContext(TagsContext)

  const getTags = async () => {
    try {
      const { data } = await axios.get('/tags')

      dispatch({ type: 'GET_TAGS', payload: data })

      setError(false)
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  const createTag = async props => {
    try {
      const { data } = await axios.post('/tags', props)

      dispatch({ type: 'CREATE_TAG', payload: data })

      setError(false)
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  const updateTag = async (id, props) => {
    try {
      const { data } = await axios.patch(`/tags/${id}`, props)

      dispatch({ type: 'UPDATE_TAG', payload: data })
    } catch ({ response }) {
      setError(response.data.error)
    }
  }

  const deleteTag = async id => {
    const { data } = await axios.delete(`/tags/${id}`)

    dispatch({ type: 'DELETE_TAG', payload: data })
  }

  return { tags, error, setError, getTags, createTag, updateTag, deleteTag, dispatch }
}

export default useTagsContext