import './styles.scss'

import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

import NotFound from '../404'
import AddTaskButton from '../../components/AddTaskButton'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import Tasks from '../../components/Tasks'

const Board = ({ boards, tasks }) => {
  let { board_id } = useParams()

  const [prefix, setPrefix] = useState('')

  const board = boards.find(board => (
    board._id === board_id
  ))

  tasks = tasks.filter(task => (
    task.board_id === board_id
  ))

  if (!board) {
    return <NotFound />
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

      {!tasks && <p className="loading">Loading...</p>}

      <AddTaskButton board_id={board_id} />

      <SearchBar setPrefix={setPrefix} />

      <ProgressBar tasks={tasks} />

      <Tasks tasks={search(tasks)} />
    </section>
  )
}

Board.propTypes = {
  boards: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired
}

export default Board