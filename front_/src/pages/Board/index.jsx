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
import useGet from '../../hooks/useGet'

const Board = () => {
  let { board_id } = useParams()

  const {
    loading: loadingBoard,
    data: board,
    error: errorBoard,
    getData: getBoard
  } = useGet(`/boards/${board_id}`)

  const {
    loading: loadingTasks,
    data: tasks,
    error: errorTasks,
    getData: getTasks
  } = useGet('/tasks')

  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    getBoard()
    getTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingBoard || loadingTasks) {
    return <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  }

  if (!board || !tasks) return

  if (errorBoard) {
    return <p>{errorBoard}</p>
  }

  if (errorTasks) {
    return <p>{errorTasks}</p>
  }

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