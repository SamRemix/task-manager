import PropTypes from 'prop-types'
import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const BoardSettings = ({ board_id, setIsOpen }) => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { dispatch } = useBoardsContext()

  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [title, setTitle] = useState('')

  useEffect(() => {
    const getBoard = async () => {
      try {
        const { data } = await axios.get(`/boards/${board_id}`)

        setTitle(data.title)
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoard()
    }
  }, [user])

  const updateBoard = async e => {
    e.preventDefault()

    // setLoading(true)

    try {
      const { data } = await axios.patch(`/boards/${board_id}`, { title })

      dispatch({ type: 'UPDATE_BOARD', payload: data })

      // setLoading(false)

      setIsOpen(false)
    } catch (err) {
      // setLoading(false)
      setError(err.response.data.error)
    }
  }

  const deleteBoard = async () => {
    const { data } = await axios.delete(`/boards/${board_id}`)

    dispatch({ type: 'DELETE_BOARD', payload: data })

    setIsOpen(false)

    navigate('/')
  }

  return (
    <>
      <form onSubmit={updateBoard}>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => {
            setError(false)
            setTitle(e.target.value)
          }}
          maxLength="24"
          focus={true}
          error={error}
        />

        <Button type="form-button">Update board</Button>
      </form>

      <Button event={deleteBoard}>Delete board</Button>
    </>
  )
}

BoardSettings.propTypes = {
  board_id: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default memo(BoardSettings)