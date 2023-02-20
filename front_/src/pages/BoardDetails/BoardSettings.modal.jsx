import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// import { useBoardsContext } from '../../hooks/useBoardsContext'
import useFetch from '../../hooks/useFetch'

// import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'
import ConfirmAndDelete from '../../components/ConfirmAndDelete'

import formatDate from '../../utils/formatDate'

const BoardSettings = ({ board, board_id, toggle }) => {
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(board.title)
  const [favorite, setFavorite] = useState(board.favorite)

  const navigate = useNavigate()

  // const { dispatch } = useBoardsContext()
  const { fetchData: updateData } = useFetch({
    method: 'patch',
    url: `/boards/${board_id}`,
    type: 'UPDATE_BOARD'
  })
  const { fetchData: deleteData } = useFetch({
    method: 'delete',
    url: `/boards/${board_id}`,
    type: 'DELETE_BOARD'
  })

  const updateBoard = e => {
    e.preventDefault()

    updateData({ title, favorite })

    toggle()
  }

  const deleteBoard = () => {
    deleteData()
    toggle()
  }

  return (
    <>
      <div className="modal-content">
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

          <div className="item-container">
            <p>Favorite:</p>
            <div className="item-container-input">
              <Input
                type="checkbox"
                placeholder="Favorite"
                checked={favorite}
                onChange={() => setFavorite(!favorite)}
              />
            </div>
          </div>

          <Button type="form-button">Update board</Button>
        </form>
      </div>

      <div className="modal-footer">
        <ConfirmAndDelete context="board" event={deleteBoard} />


        <div className="tips">
          <p>Created on {formatDate(board.createdAt)}</p>

          {board.createdAt !== board.updatedAt && (
            <p>Last update on {formatDate(board.updatedAt)}</p>
          )}
        </div>
      </div>
    </>
  )
}

BoardSettings.propTypes = {
  board_id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
}

export default memo(BoardSettings)