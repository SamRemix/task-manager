import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

import formatDate from '../../utils/formatDate'

const BoardSettings = ({ board, board_id, setIsOpen }) => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { dispatch } = useBoardsContext()

  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(board.title)

  // useEffect(() => {
  //   const getBoard = async () => {
  //     try {
  //       const { data } = await axios.get(`/boards/${board_id}`)

  //       setTitle(data.title)
  //     } catch (err) {
  //       dispatch({ type: 'ERROR', payload: err.response.data.error })
  //     }
  //   }

  //   if (user) {
  //     getBoard()
  //   }
  // }, [user])

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
    try {
      setIsOpen(false)

      const { data } = await axios.delete(`/boards/${board_id}`)

      dispatch({ type: 'DELETE_BOARD', payload: data })

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1 className="modal-content-title">Settings</h1>
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

        <Button type="form-button">Update board</Button>
      </form>

      <Button type="delete" event={deleteBoard}>Delete board</Button>

      <p>{formatDate(board.createdAt)}</p>
    </>
  )
}

BoardSettings.propTypes = {
  board_id: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default memo(BoardSettings)