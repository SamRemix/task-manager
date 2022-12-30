import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion } from 'framer-motion'

import AddLink from '../../components/AddLink'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import TasksList from '../../components/TasksList'
import DeleteButton from '../../components/DeleteButton'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTasksContext } from '../../hooks/useTasksContext'

import axios from '../../axios.config'

import { Loader } from 'semantic-ui-react'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()

  const { loading, tasks, error, dispatch } = useTasksContext()

  // const [filteredTasks, setFilteredTasks] = useState(null)
  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await axios.get('/tasks')

        dispatch({ type: 'GET_TASKS', payload: response.data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getTasks()
    }
  }, [dispatch, user])

  // if (loading) {
  //   return <Loader active content="Loading" />
  // }

  if (loading) {
    setTimeout(() => {
      return (
        <Loader active content="Loading" />
        // <motion.div
        //   initial={{
        //     opacity: 0
        //   }}
        //   animate={{
        //     opacity: 1,
        //     transition: {
        //       duration: .2
        //     }
        //   }}>
        //   <Loader active content="Loading" />
        // </motion.div>
      )
    }, 0)
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
      <DeleteButton id={board_id} />

      <AddLink path={`/add-task/${board_id}`} content="Task" />

      <SearchBar setPrefix={setPrefix} />

      <ProgressBar tasks={filteredTasks} />

      <TasksList tasks={search(filteredTasks)} />
    </section>
  )
}

export default memo(BoardDetails)