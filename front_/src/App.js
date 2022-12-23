import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuthContext } from './contexts/AuthContext'

// components
import Navbar from './components/Navbar'

// pages
import Home from './pages/Home'
import Boards from './pages/Boards'
import Board from './pages/Board'
import TaskDetails from './pages/TaskDetails'
import AddTask from './pages/AddTask'
import UpdateTask from './pages/UpdateTask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Account from './pages/Account'
import NotFound from './pages/404'

const App = () => {
  const location = useLocation()
  const { user } = useAuthContext()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:board_id" element={<Board />} />
          <Route path="/boards/:board_id/:task_id" element={<TaskDetails />} />
          <Route path="/add-task/:board_id" element={<AddTask />} />
          <Route path="/update-task/:task_id" element={<UpdateTask />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/account" element={user && <Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default memo(App)