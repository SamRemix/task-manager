import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import ProgressBar from '../../components/ProgressBar'
import TasksList from '../../components/TasksList'
import Modal from '../../components/Modal'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'

import useAuthQueries from '../../hooks/useAuthQueries'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import { useTasksContext } from '../../hooks/useTasksContext'
import useSearch from '../../hooks/useSearch'
import useToggle from '../../hooks/useToggle'
import useDocumentTitle from '../../hooks/useDocumentTitle'

import axios from '../../axios.config'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

import { HiPlus, HiOutlineCog6Tooth } from 'react-icons/hi2'

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

  useDocumentTitle(board?.title)

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
    <section className="container board__container">
      <header>
        <motion.div
          className="buttons"
          {...config.headerButtonsAnimation}>
          <Button event={() => {
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

        <motion.div {...config.searchBarAnimation}>
          <Input type="search" setPrefix={setPrefix} />
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