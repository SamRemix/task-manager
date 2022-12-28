import './styles.scss'

import { memo, useEffect } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from "../../hooks/useAuthContext"
import { useBoardsContext } from "../../hooks/useBoardsContext"

import axios from '../../axios.config'

import { Loader, Dimmer } from 'semantic-ui-react'

import Item from './Item'

const Boards = () => {
  const { user } = useAuthContext()
  const { loading, boards, error, dispatch } = useBoardsContext()

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
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container boards-page">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Boards
      </motion.h1>

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
    </section>
  )
}

export default memo(Boards)