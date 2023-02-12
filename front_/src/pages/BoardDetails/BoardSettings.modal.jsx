import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

import formatDate from '../../utils/formatDate'

const BoardSettings = ({ board, board_id, toggle }) => {
  const navigate = useNavigate()

  const { dispatch } = useBoardsContext()

  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(board.title)
  const [favorite, setFavorite] = useState(board.favorite)

  const updateBoard = async e => {
    e.preventDefault()

    // setLoading(true)

    try {
      const { data } = await axios.patch(`/boards/${board_id}`, {
        title,
        favorite
      })

      dispatch({ type: 'UPDATE_BOARD', payload: data })

      // setLoading(false)

      toggle()
    } catch (err) {
      // setLoading(false)
      setError(err.response.data.error)
    }
  }

  const deleteBoard = async () => {
    try {
      toggle()

      const { data } = await axios.delete(`/boards/${board_id}`)

      dispatch({ type: 'DELETE_BOARD', payload: data })

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1 className="modal-content-title">Board settings</h1>
      <form onSubmit={updateBoard}>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => {
            setError('')
            setTitle(e.target.value)
          }}
          maxLength="24"
          focus={true}
          error={error}
        />

        <Input
          type="checkbox"
          placeholder="Favorite"
          value={favorite}
          onChange={() => setFavorite(!favorite)}
        />

        <Button type="form-button">Update board</Button>
      </form>

      <Button type="delete" event={deleteBoard}>Delete board</Button>

      <p>{formatDate(board.createdAt)}</p>
    </>
  )
}

BoardSettings.propTypes = {
  board_id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(BoardSettings)