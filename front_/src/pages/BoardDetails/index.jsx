import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useAuthQueries from '../../hooks/useAuthQueries'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import { useTasksContext } from '../../hooks/useTasksContext'
import useSearch from '../../hooks/useSearch'
import useToggle from '../../hooks/useToggle'

import axios from '../../axios.config'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'
import ProgressBar from '../../components/ProgressBar'
import TasksList from '../../components/TasksList'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

import { HiPlus, HiOutlineCog6Tooth } from 'react-icons/hi2'

import setDocumentTitle from '../../utils/setDocumentTitle'
import capitalize from '../../utils/capitalize'

const BoardDetails = () => {
  let { board_id } = useParams()
  const { user } = useAuthQueries()
  const { boards } = useBoardsContext()
  const { loading, tasks, error, dispatch } = useTasksContext()
  const { setPrefix, search } = useSearch()
  const { display, toggle } = useToggle()

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  const board = boards.find(board => (
    board._id === board_id
  ))

  setDocumentTitle(board?.title)

  useEffect(() => {
    const getTasks = async () => {
      dispatch({ type: 'LOADING' })
      try {
        const { data } = await axios.get('/tasks')

        dispatch({
          type: 'GET_TASKS', payload: data.filter(task => (
            task.board_id === board_id
          ))
        })
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

  return (
    <section className="container boards">
      <header className="boards-header">
        <motion.h1
          className="title"
          {...config.boardTitleAnimation}>
          {capitalize(board?.title)}
        </motion.h1>

        <motion.div {...config.searchBarAnimation}>
          <Input type="search" setPrefix={setPrefix} />
        </motion.div>

        <motion.div
          className="buttons"
          {...config.headerButtonsAnimation}>
          <Button
            type="green"
            event={() => {
              toggle()
              setIsSettingsOpen(false)
              setIsTaskFormOpen(true)
            }}>
            <HiPlus size="1.2em" />
            Add task
          </Button>

          <Button
            event={() => {
              toggle()
              setIsTaskFormOpen(false)
              setIsSettingsOpen(true)
            }}>
            <HiOutlineCog6Tooth size="1.2em" />
            Settings
          </Button>
        </motion.div>
      </header>

      <ProgressBar tasks={tasks} layoutId="progressbar" />

      <TasksList tasks={search(tasks)} layoutId="tasksList" />

      <AnimatePresence>
        {display && (
          <Modal toggle={toggle}>
            {isSettingsOpen ? (
              <BoardSettings board={board} board_id={board_id} toggle={toggle} />
            ) : isTaskFormOpen && (
              <AddTaskForm board_id={board_id} toggle={toggle} />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}

export default memo(BoardDetails)