import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import TasksList from '../../components/TasksList'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'
import Modal from '../../components/Modal'

import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import { useTasksContext } from '../../hooks/useTasksContext'

import axios from '../../axios.config'

// import Button from '../../components/Button'
import {
  Loader,
  Button
} from 'semantic-ui-react'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()
  const { boards } = useBoardsContext()
  const { loading, tasks, error, dispatch } = useTasksContext()

  const board = boards.find(board => (
    board._id === board_id
  ))

  useDocumentTitle(board?.title)

  const [prefix, setPrefix] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  const [title, setTitle] = useState('')



  useEffect(() => {
    const getTasks = async () => {
      dispatch({ type: 'LOADING' })

      try {
        // const { data } = await axios.get(`/tasks/${board_id}`)
        const { data } = await axios.get('/tasks')

        dispatch({ type: 'GET_TASKS', payload: data.filter(d => d.board_id === board_id) })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
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
      <header>
        <motion.div {...config.addTaskButtonAnimation}>
          <Button
            // type={post}
            onClick={() => {
              setIsOpen(true)
              setIsSettingsOpen(false)
              setIsTaskFormOpen(true)
              setTitle('Add task')
            }}>
            + Add task
          </Button>
        </motion.div>

        <SearchBar setPrefix={setPrefix} />

        <motion.div {...config.settingsButtonAnimation}>
          <Button
            content="Settings"
            basic
            onClick={() => {
              setIsOpen(true)
              setIsTaskFormOpen(false)
              setIsSettingsOpen(true)
              setTitle('Settings')
            }} />
        </motion.div>
      </header>

      <ProgressBar tasks={tasks} />

      <TasksList tasks={search(tasks)} />

      {isOpen && (
        <Modal title={title} setIsOpen={setIsOpen}>
          {isSettingsOpen ? (
            <BoardSettings board_id={board_id} setIsOpen={setIsOpen} />
          ) : isTaskFormOpen && (
            <AddTaskForm board_id={board_id} setIsOpen={setIsOpen} />
          )}
        </Modal>
      )}
    </section>
  )
}

export default memo(BoardDetails)