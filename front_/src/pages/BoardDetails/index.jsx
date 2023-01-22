import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import ProgressBar from '../../components/ProgressBar'
import TasksList from '../../components/TasksList'
import Modal from '../../components/Modal'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import { useTasksContext } from '../../hooks/useTasksContext'
import useSearch from '../../hooks/useSearch'
import useDocumentTitle from '../../hooks/useDocumentTitle'

import axios from '../../axios.config'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()
  const { boards } = useBoardsContext()
  const { loading, tasks, error, dispatch } = useTasksContext()
  const { setPrefix, search } = useSearch()

  const board = boards.find(board => (
    board._id === board_id
  ))

  useDocumentTitle(board?.title)

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

        // setTimeout(() => {
        dispatch({ type: 'GET_TASKS', payload: data.filter(d => d.board_id === board_id) })
        // }, 500)
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
        <Loader />
      </section >
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container board__container">
      <header>
        <motion.div {...config.addTaskButtonAnimation}>
          <Button event={() => {
            setIsOpen(true)
            setIsSettingsOpen(false)
            setIsTaskFormOpen(true)
            setTitle('Add task')
          }}>
            + Add task
          </Button>
        </motion.div>

        <motion.div {...config.searchBarAnimation}>
          <Input type="search" setPrefix={setPrefix} />
        </motion.div>

        <motion.div {...config.settingsButtonAnimation}>
          <Button
            event={() => {
              setIsOpen(true)
              setIsTaskFormOpen(false)
              setIsSettingsOpen(true)
              setTitle('Settings')
            }}>Settings</Button>
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