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

import capitalize from '../../utils/capitalize'

import axios from '../../axios.config'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'

const BoardDetails = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()
  const { boards } = useBoardsContext()
  const { loading, tasks, error, dispatch } = useTasksContext()
  const { prefix, setPrefix, search } = useSearch()

  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

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
        <motion.div {...config.addTaskButtonAnimation}>
          <Button event={() => {
            setIsOpen(true)
            setIsSettingsOpen(false)
            setIsTaskFormOpen(true)
            setModalTitle('Add task')
          }}>
            + Add task
          </Button>
        </motion.div>

        <motion.div {...config.searchBarAnimation}>
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
                    {/* <br /> */}
                    {/* {36 - prefix.length} remaining character{prefix.length < 35 && 's'} */}
                  </p>
                )}
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div {...config.settingsButtonAnimation}>
          <Button
            event={() => {
              setIsOpen(true)
              setIsTaskFormOpen(false)
              setIsSettingsOpen(true)
              setModalTitle('Settings')
            }}>Settings</Button>
        </motion.div>
      </header>

      <ProgressBar tasks={tasks} />

      <TasksList tasks={search(tasks)} />

      {isOpen && (
        <Modal title={modalTitle} setIsOpen={setIsOpen}>
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