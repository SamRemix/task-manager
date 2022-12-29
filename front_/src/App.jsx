import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { useAuthContext } from './hooks/useAuthContext'

// components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

// pages
import Home from './pages/Home'
import BoardDetails from './pages/BoardDetails'
import TaskDetails from './pages/TaskDetails'
import AddBoard from './pages/AddBoard'
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
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards/:board_id" element={<BoardDetails />} />
          <Route path="/add-board" element={<AddBoard />} />
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