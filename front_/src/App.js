import { useState, useEffect } from 'react'
import axios from 'axios'
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

  useEffect(() => {
    if (user) {
      axios.get('/boards', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => {
        setBoards(res.data)
      })

      axios.get('/tasks', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }).then(res => {
        setTasks(res.data)
      })
    }
  }, [user])

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={boards && tasks && <Boards boards={boards} tasks={tasks} />} />
          <Route path="/boards/:board_id" element={boards && tasks && <Board boards={boards} tasks={tasks} />} />
          {/* <Route path="/task-board" element={<Tasks />} /> */}
          <Route path="/boards/:board_id/:task_id" element={tasks && <TaskDetails tasks={tasks} />} />
          <Route path="/add-task/:board_id" element={<AddTask />} />
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