import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBoardsContext } from '../hooks/useBoardsContext'
import BoardsItem from '../components/BoardsItem'

const Boards = () => {
  const { boards, dispatch } = useBoardsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch('/boards', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({
          type: 'SET_BOARDS',
          payload: json
        })
      }
    }

    if (user) {
      fetchBoards()
    }
  }, [dispatch, user])

  return (
    <section className="container boards-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Boards
      </motion.h1>
      <nav>
        <ul>
          {boards && boards.map(({ title }) => (
            <BoardsItem path={`/${title.toLowerCase().replace(' ', '-')}`} title={title} />
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Boards