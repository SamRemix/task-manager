import './styles.scss'

import PropTypes from 'prop-types'
import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

import NotFound from '../404'
import AddTaskButton from '../../components/AddTaskButton'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import Tasks from '../../components/Tasks'

import { useAuthContext } from '../../hooks/useAuthContext'
import useGet from '../../hooks/useGet'

const Board = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()

  const { data: board, getData: getBoard } = useGet(`/boards/${board_id}`)
  const { data: tasks, getData: getTasks } = useGet('/tasks')

  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    getBoard()
    getTasks()
  }, [user])

  if (!board || !tasks) return
  // if (!tasks) return

  const filteredTasks = tasks.filter(task => (
    task.board_id === board_id
  ))

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

      <ProgressBar tasks={filteredTasks} />

      <Tasks tasks={search(filteredTasks)} />
    </section>
  )
}

// Board.propTypes = {
//   // boards: PropTypes.array.isRequired,
//   tasks: PropTypes.array.isRequired
// }

export default memo(Board)