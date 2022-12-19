import { useState, useEffect, useContext } from 'react'
import axios from './axios.config'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuthContext } from './hooks/useAuthContext'

import { TasksContext } from './context/TasksContext'
import { BoardsContext } from './context/BoardsContext'

// components
import Navbar from './components/Navbar'

// pages
import Home from './pages/Home'
import Boards from './pages/Boards'
import Board from './pages/Board'
import TaskDetails from './pages/TaskDetails'
import AddTask from './pages/AddTask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Account from './pages/Account'
import NotFound from './pages/404'

const App = () => {
  const { boards, dispatchBoards } = useContext(BoardsContext)
  const { tasks, dispatchTasks } = useContext(TasksContext)

  const location = useLocation()
  const { user } = useAuthContext()

  const [error, setError] = useState(null)

  const getBoards = async () => {
    try {
      const response = await axios.get('/boards')

      dispatchBoards({ type: 'GET_BOARDS', payload: response.data })
    } catch (err) {
      setError(err.response.data.error)

      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      const response = await axios.get('/tasks')

      dispatchTasks({ type: 'GET_TASKS', payload: response.data })
    } catch (err) {
      setError(err.response.data.error)

      console.log(error)
    }
  }

  useEffect(() => {
    getBoards()
    getTasks()
  }, [user])

  return (
    <>
      <Navbar boards={boards} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={boards && <Boards boards={boards} />} />
          <Route path="/boards/:board_id" element={boards && tasks && <Board boards={boards} tasks={tasks} />} />
          <Route path="/boards/:board_id/:task_id" element={tasks && <TaskDetails tasks={tasks} />} />
          <Route path="/add-task/:board_id" element={<AddTask getTasks={getTasks} />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/account' element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App