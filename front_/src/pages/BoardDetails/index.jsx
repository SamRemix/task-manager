import './styles.scss'

import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import AddTaskButton from '../../components/AddTaskButton'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import TasksList from '../../components/TasksList'

import { useTasksContext } from '../../hooks/useTasksContext'

import { Loader } from 'semantic-ui-react'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { loading, tasks, error } = useTasksContext()

  const [prefix, setPrefix] = useState('')

  if (loading) {
    return (
      <section className="container">
        <Loader active content="Loading" />
      </section>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  let filteredTasks = []

  if (Array.isArray(tasks)) {
    filteredTasks = tasks.filter(task => (
      task.board_id === board_id
    ))
  }

  const search = data => {
    return data.filter(({ title }) => (
      title.toLowerCase().startsWith(prefix.toLowerCase())
    ))
  }

  return (
    <section className="container board__container">
      <AddTaskButton path={`/add-task/${board_id}`} />

      <SearchBar setPrefix={setPrefix} />

      <ProgressBar tasks={filteredTasks} />

      <TasksList tasks={search(filteredTasks)} />
    </section>
  )
}

export default memo(BoardDetails)