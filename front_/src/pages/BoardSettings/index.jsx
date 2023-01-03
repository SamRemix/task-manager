import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cn from 'classnames'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import { Form, Button } from 'semantic-ui-react'
// import { HiOutlineTrash } from 'react-icons/hi2'

const BoardSettings = () => {
  const { board_id } = useParams()
  const navigate = useNavigate()

  const { loading, boards, error, dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')

  const [visible, setVisible] = useState(false)

  const displayMessage = () => {
    !visible ? setVisible(true) : setVisible(false)
  }

  // const board = boards.find(board => (
  //   board._id === board_id
  // ))

  // setTitle(board.title)

  // const updateBoard = async e => {
  //   e.preventDefault()

  //   dispatch({ type: 'LOADING' })

  //   try {
  //     const response = await axios.patch(`/boards/${board_id}`, { title })

  //     dispatch({ type: 'UPDATE_BOARD', payload: response.data })

  //     // navigate(`/boards/${board.board_id}`)
  //   } catch (err) {
  //     dispatch({ type: 'ERROR', payload: err.response.data.error })
  //   }
  // }

  const deleteBoard = async () => {
    const response = await axios.delete(`/boards/${board_id}`)

    dispatch({ type: 'DELETE_BOARD', payload: response.data })
    navigate('/')
  }

  return (
    <section className="container board__settings">
      {/* <h1>{board.title}</h1> */}
      <Form>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            className={`title__input${error && ' error'}`}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            maxLength="24"
            autoFocus />
          <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Update board" secondary />
          ) : (
            <Form.Button className="submit" content="Update board" loading secondary />
          )}
        </motion.div>

        {error && (
          <div
            className="error-message">
            <motion.p {...config.errorMessageAnimation}>
              {error}
            </motion.p>
          </div>
        )}
      </Form>

      <div className="board__settings-delete">
        <div className="board__settings-delete-button">
          <Button content={visible ? "Cancel" : "Delete"} secondary onClick={displayMessage} />
          {visible && (
            <Button
              {...config.deleteAnimation}
              className="btn-confirm"
              color="red"
              onClick={deleteBoard}>
              yes
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(BoardSettings)