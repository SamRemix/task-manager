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
import useTasksRequests from '../../hooks/useTasksRequests'

const Board = () => {
  let { board_id } = useParams()
  const { loading, boards: board, error, getSingleBoard } = useGetBoards()

  const { tasks, getTasks } = useTasksRequests()

  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    getSingleBoard(board_id)
    getTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  if (!tasks) return

  if (error) {
    return <p>{error}</p>
  }

  // const board = data[0] // object

  // const tasks = data[1].filter(task => (
  //   task.board_id === board_id
  // ))

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

export default memo(Board)