import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

import AddTaskButton from '../../components/AddTaskButton'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import Tasks from '../../components/Tasks'

import { Loader, Dimmer } from 'semantic-ui-react'

import useGetBoards from '../../hooks/useGetBoards'

const Board = () => {
  let { board_id } = useParams()
  const { loading, boards: board, error, getSingleBoard } = useGetBoards()

  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    getSingleBoard(board_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  if (!board) return

  if (error) {
    return <p>{error}</p>
  }

  const search = data => {
    return data.filter(({ title }) => (
      title.toLowerCase().startsWith(prefix.toLowerCase())
    ))
  }

  return (
    <section className="container board__container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        {board.title}
      </motion.h1>

      <AddTaskButton board_id={board_id} />

      <SearchBar setPrefix={setPrefix} />

      {board.tasks && <ProgressBar tasks={board.tasks} />}

      {board.tasks && <Tasks tasks={search(board.tasks)} />}
    </section>
  )
}

export default memo(Board)