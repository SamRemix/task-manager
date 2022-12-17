import { useState, useEffect } from 'react'
import axios from './config'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuthContext } from './hooks/useAuthContext'

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
  const location = useLocation()
  const { user } = useAuthContext()

  const [tasks, setTasks] = useState(null)
  const [boards, setBoards] = useState(null)

  const fetchTasks = async () => {
    try {
      const getTasks = await axios.get('/tasks')

      setTasks(getTasks.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchBoards = async () => {
    try {
      const getBoards = await axios.get('/boards')

      setBoards(getBoards.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
      fetchBoards()
    }
  }, [user])

  return (
    <>
      <Navbar boards={boards} />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={boards && <Boards boards={boards} />} />
          <Route path="/boards/:board_id" element={boards && tasks && <Board boards={boards} tasks={tasks} />} />
          {/* <Route path="/task-board" element={<Tasks />} /> */}
          <Route path="/boards/:board_id/:task_id" element={tasks && <TaskDetails tasks={tasks} />} />
          <Route path="/add-task/:board_id" element={<AddTask fetchData={fetchTasks} tasks={tasks} />} />
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