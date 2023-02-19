import './styles.scss'

import { memo, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useAuthContext from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import useTasksContext from '../../hooks/useTasksContext'
import useSearch from '../../hooks/useSearch'
import useToggle from '../../hooks/useToggle'

import axios from '../../axios.config'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'
import TaskSettings from './TaskSettings.modal'

import Header from '../../components/Header'
import ProgressBar from '../../components/ProgressBar'
import TasksList from '../../components/TasksList'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import Input from '../../components/Input'
import QueryStatus from '../../components/QueryStatus'

import { PlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

import setDocumentTitle from '../../utils/setDocumentTitle'
import capitalize from '../../utils/capitalize'

const BoardDetails = () => {
  let { board_id } = useParams()
  const { user } = useAuthContext()
  const { boards } = useBoardsContext()
  const { tasks, loading, setLoading, error, setError, dispatch } = useTasksContext()
  const { prefix, setPrefix, search } = useSearch()
  const { display, toggle } = useToggle()

  // define modal content
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [isTaskSettingsOpen, setIsTaskSettingsOpen] = useState(false)

  // set which task is displayed by clicking on the task setting button
  const [taskId, setTaskId] = useState('')

  // focus on search bar when prefix is set
  const searchBar = useRef(null)

  useEffect(() => {
    if (prefix && searchBar.current) {
      searchBar.current.focus()
    }
  }, [prefix])

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true)

      try {
        const { data } = await axios.get(`/tasks/${board_id}`)

        dispatch({ type: 'GET_TASKS', payload: data })

        setLoading(false)
        setError(false)
      } catch ({ response }) {
        setLoading(false)
        setError(response.data.error)
      }
    }

    if (user) {
      getTasks()
    }
  }, [dispatch, user])

  if (loading || error) {
    return (
      <QueryStatus loading={loading} error={error} />
    )
  }

  const board = boards.find(board => (
    board._id === board_id
  ))

  setDocumentTitle(board?.title)

  return (
    <section className="container board">
      <Header>
        <h1 className="title">
          {capitalize(board?.title)}
        </h1>


        <div className="right-side">
          <Input
            type="search"
            focus={searchBar}
            value={prefix}
            setPrefix={setPrefix}
          />
          <Button
            type="secondary"
            event={() => {
              toggle()
              setIsBoardSettingsOpen(false)
              setIsTaskSettingsOpen(false)
              setIsTaskFormOpen(true)
            }}>
            <PlusIcon width="1.5em" />
            Add task
          </Button>

          <Button
            event={() => {
              toggle()
              setIsTaskFormOpen(false)
              setIsTaskSettingsOpen(false)
              setIsBoardSettingsOpen(true)
            }}>
            <Cog6ToothIcon width="1.5em" />
            Settings
          </Button>
        </div>
      </Header>

      <ProgressBar tasks={tasks} />

      <TasksList
        tasks={search(tasks)}
        toggleModal={() => {
          toggle()
          setIsBoardSettingsOpen(false)
          setIsTaskFormOpen(false)
          setIsTaskSettingsOpen(true)
        }}
        setTaskId={setTaskId}
        prefix={prefix}
        setPrefix={setPrefix}
        searchBarRef={searchBar.current}
      />

      <AnimatePresence>
        {display && (
          <Modal toggle={toggle}>
            {isBoardSettingsOpen && (
              <BoardSettings
                board={board}
                board_id={board_id}
                toggle={toggle}
              />
            )}

            {isTaskFormOpen && (
              <AddTaskForm
                board_id={board_id}
                toggle={toggle}
              />
            )}

            {isTaskSettingsOpen && (
              <TaskSettings
                task={tasks.find(({ _id }) => (
                  _id === taskId
                ))}
                toggle={toggle}
              />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}

export default memo(BoardDetails)