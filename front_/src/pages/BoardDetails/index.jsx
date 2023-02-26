import './styles.scss'

import { memo, useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import { BoardsContext } from '../../contexts/BoardsContext'
import { TasksContext } from '../../contexts/TasksContext'

import useFetch from '../../hooks/useFetch'
import useSearch from '../../hooks/useSearch'
import useToggle from '../../hooks/useToggle'

import AddTaskForm from './AddTaskForm.modal'
import BoardSettings from './BoardSettings.modal'
import TaskSettings from './TaskSettings.modal'
import DeleteTasks from './DeleteTasks.modal'

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
  // define modal content
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [isTaskSettingsOpen, setIsTaskSettingsOpen] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)
  // set which task is displayed by clicking on the task setting button
  const [taskId, setTaskId] = useState('')
  // selected tasks (delete many)
  const [tasksIds, setTasksIds] = useState([])

  let { board_id } = useParams()

  const { boards } = useContext(BoardsContext)
  const { tasks } = useContext(TasksContext)

  const { loading, error } = useFetch({
    method: 'get',
    url: `/tasks/${board_id}`,
    type: 'GET_TASKS',
    params: {
      id: board_id
    }
  })
  const { prefix, setPrefix, search } = useSearch()
  const { display, toggle } = useToggle()

  // focus on search bar when prefix is set
  const searchBar = useRef(null)

  useEffect(() => {
    if (prefix && searchBar.current) {
      searchBar.current.focus()
    }
  }, [prefix])

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

        <Button
          event={() => {
            toggle()
            setIsTaskFormOpen(false)
            setIsTaskSettingsOpen(false)
            setIsDeleteMessageOpen(false)
            setIsBoardSettingsOpen(true)
          }}>
          <Cog6ToothIcon width="1.5em" />
          Settings
        </Button>
      </Header>

      <motion.div
        className="top-bar"
        {...config.topBarAnimation}>
        <div className="left-side">
          <AnimatePresence mode='popLayout'>
            {tasksIds.length > 0 && (
              <motion.div
                layoutId="deleteManyTasksButton"
                {...config.deleteManyButtonAnimation}>
                <Button
                  type="delete"
                  event={() => {
                    toggle()
                    setIsBoardSettingsOpen(false)
                    setIsTaskSettingsOpen(false)
                    setIsTaskFormOpen(false)
                    setIsDeleteMessageOpen(true)
                  }}>
                  Delete
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layoutId="SearchBar">
            <Input
              type="search"
              focus={searchBar}
              value={prefix}
              setPrefix={setPrefix}
            />
          </motion.div>
        </div>

        <motion.div layoutId="AddTaskButton">
          <Button
            type="secondary"
            event={() => {
              toggle()
              setIsBoardSettingsOpen(false)
              setIsTaskSettingsOpen(false)
              setIsDeleteMessageOpen(false)
              setIsTaskFormOpen(true)
            }}>
            <PlusIcon width="1.5em" />
            Add task
          </Button>
        </motion.div>
      </motion.div>

      <ProgressBar tasks={tasks} />

      <TasksList
        tasks={search(tasks)}
        toggleModal={() => {
          toggle()
          setIsBoardSettingsOpen(false)
          setIsTaskFormOpen(false)
          setIsDeleteMessageOpen(false)
          setIsTaskSettingsOpen(true)
        }}
        setTaskId={setTaskId}
        tasksIds={tasksIds}
        setTasksIds={setTasksIds}
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

            {isDeleteMessageOpen && (
              <DeleteTasks
                tasks={tasks}
                tasksIds={tasksIds}
                setTasksIds={setTasksIds}
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