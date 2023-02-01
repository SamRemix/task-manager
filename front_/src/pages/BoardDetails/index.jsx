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
import useDocumentTitle from '../../hooks/useDocumentTitle'

import axios from '../../axios.config'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

import capitalize from '../../utils/capitalize'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { user } = useAuthQueries()
  const { boards } = useBoardsContext()
  const { loading, tasks, error, dispatch } = useTasksContext()
  const { prefix, setPrefix, search } = useSearch()

  const [isOpen, setIsOpen] = useState(false)
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
          type: 'GET_TASKS', payload: data.filter(d => (
            d.board_id === board_id
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

  const addTask = async e => {
    e.preventDefault()

    // setLoading(true)

    try {

      if (prefix) {
        const { data } = await axios.post('/tasks', { title: prefix, important: false, board_id })

        setPrefix('')

        dispatch({ type: 'CREATE_TASK', payload: data })
      }

      // setLoading(false)

      // setIsOpen(false)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
      // setLoading(false)
      // setError(err.response.data.error)
    }
  }

  return (
    <section className="container board__container">
      <header>
        <motion.div layoutId="addBoardButton" {...config.addTaskButtonAnimation}>
          <Button event={() => {
            setIsOpen(true)
            setIsSettingsOpen(false)
            setIsTaskFormOpen(true)
          }}>
            + Add task
          </Button>
        </motion.div>

        <motion.div layoutId="settingsButton" {...config.settingsButtonAnimation}>
          <Button
            event={() => {
              setIsOpen(true)
              setIsTaskFormOpen(false)
              setIsSettingsOpen(true)
            }}>Settings</Button>
        </motion.div>

        <motion.div layoutId="searchbar" {...config.searchBarAnimation}>
          <form onSubmit={addTask}>
            <Input type="search" value={prefix} setPrefix={setPrefix} />

            {prefix && (
              <motion.div
                className={error ? 'task-quick-add--error' : 'task-quick-add'}
                {...config.taskQuickAddAnimation}>
                {error ? (
                  <p>{error}</p>
                ) : (
                  <p>Press <b>Enter</b> to create <b>{capitalize(prefix)}</b> task.
                  </p>
                )}
              </motion.div>
            )}
          </form>
        </motion.div>
      </header>

      <ProgressBar tasks={tasks} layoutId="progressbar" />

      <TasksList tasks={search(tasks)} layoutId="tasksList" />

      <AnimatePresence>
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            {isSettingsOpen ? (
              <BoardSettings board={board} board_id={board_id} setIsOpen={setIsOpen} />
            ) : isTaskFormOpen && (
              <AddTaskForm board_id={board_id} setIsOpen={setIsOpen} />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}

export default memo(BoardDetails)