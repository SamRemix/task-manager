import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AddTaskButton from '../../components/AddTaskButton'
import ProgressBar from '../../components/ProgressBar'
import SearchBar from '../../components/SearchBar'
import Tasks from '../../components/Tasks'

import { Loader } from 'semantic-ui-react'

import { useAuthContext } from "../../hooks/useAuthContext"
import { useBoardsContext } from "../../hooks/useBoardsContext"
import { useTasksContext } from "../../hooks/useTasksContext"

import axios from '../../axios.config'

const Board = () => {
  let { board_id } = useParams()

  const { user } = useAuthContext()

  const { loading: loadBoard, boards: board, error: boardErr, dispatch: dispatchBoard } = useBoardsContext()
  const { loading: loadTasks, tasks, error: tasksErr, dispatch: dispatchTasks } = useTasksContext()

  const [prefix, setPrefix] = useState('')

  useEffect(() => {
    const getBoard = async id => {
      dispatchBoard({ type: 'LOADING' })

      try {
        const response = await axios.get(`/boards/${id}`)

        dispatchBoard({ type: 'GET_BOARDS', payload: response.data })
      } catch (err) {
        dispatchBoard({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoard(board_id)
    }
  }, [dispatchBoard, user])

  useEffect(() => {
    const getTasks = async () => {
      dispatchTasks({ type: 'LOADING' })

      try {
        const response = await axios.get('/tasks')

        dispatchTasks({ type: 'GET_TASKS', payload: response.data })
      } catch (err) {
        dispatchTasks({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getTasks()
    }
  }, [dispatchTasks, user])

  if (loadBoard || loadTasks) {
    return <Loader active content="Loading" />
  }

  if (boardErr || tasksErr) {
    return <p>{boardErr || tasksErr}</p>
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
      <AddTaskButton board_id={board_id} />

      <SearchBar setPrefix={setPrefix} />

      <ProgressBar tasks={filteredTasks} />

      <Tasks tasks={search(filteredTasks)} />
    </section>
  )
}

export default memo(Board)