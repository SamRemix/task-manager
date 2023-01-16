import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import TasksList from '../../components/TasksList'

import { useTasksContext } from '../../hooks/useTasksContext'

import { Loader, Button } from 'semantic-ui-react'

import { useAuthContext } from '../../hooks/useAuthContext'

import axios from '../../axios.config'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { loading, tasks, error, dispatch } = useTasksContext()

  const [prefix, setPrefix] = useState('')

  const { user } = useAuthContext()

  useEffect(() => {
    const getTasks = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const { data } = await axios.get(`/tasks/${board_id}`)

        dispatch({ type: 'GET_TASKS', payload: data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error || err.message })
      }
    }

    if (user) {
      getTasks()
    }
  }, [dispatch, user])

  if (loading) {
    return (
      <section className="container">
        <Loader active content="Loading" />
      </section >
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  const search = data => (
    data.filter(({ title }) => (
      title.toLowerCase().startsWith(prefix.trim().toLowerCase())
    ))
  )

  return (
    <section className="container board__container">
      {/* <AddTaskButton path={`/add-task/${board_id}`} /> */}
      <motion.div
        className="add-task__button"
        {...config.buttonAnimation}>
        <Link to={`/add-task/${board_id}`}>
          <Button className="link" content="+ Add task" secondary />
        </Link>
      </motion.div>

      <SearchBar setPrefix={setPrefix} />

      <ProgressBar tasks={tasks} />

      <TasksList tasks={search(tasks)} />
    </section>
  )
}

export default memo(BoardDetails)