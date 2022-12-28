import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from "../../hooks/useAuthContext"
import { useBoardsContext } from "../../hooks/useBoardsContext"

import axios from '../../axios.config'

import { Loader, Button } from 'semantic-ui-react'

import Item from './Item'

const Boards = () => {
  const { user } = useAuthContext()
  const { loading, boards, error, dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')

  useEffect(() => {
    const getBoards = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await axios.get('/boards')

        dispatch({ type: 'GET_BOARDS', payload: response.data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoards()
    }
  }, [dispatch, user])

  if (loading) {
    return <Loader active content="Loading" />
  }

  if (error) {
    return <p>{error}</p>
  }

  const addBoard = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/boards', { title })

      dispatch({ type: 'CREATE_BOARD', payload: response.data })

      setTitle('')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return (
    <section className="container boards-page">
      <motion.div
        className="boards"
        {...config.boardsMenuAnimation}>
        <nav>
          <ul>
            {Array.isArray(boards) ? (
              boards.map(board => (
                <Item key={board._id} {...board} />
              ))
            ) : (
              <p>No boards</p>
            )}
          </ul>
        </nav>
      </motion.div>
      <form onSubmit={addBoard}>
        <motion.div
          className="title__input"
          {...config.titleInputAnimation}>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={error && 'error'}
            placeholder="Title"
            maxLength="24"
            autoFocus />
          <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Button className="submit" primary>Add Board</Button>
          ) : (
            <Button className="submit" loading primary></Button>
          )}
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </form>
    </section>
  )
}

export default memo(Boards)