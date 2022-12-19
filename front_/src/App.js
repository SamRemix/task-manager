import { memo, useState, useEffect, useContext } from 'react'
import axios from './axios.config'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuthContext } from './hooks/useAuthContext'

import { TasksContext } from './context/TasksContext'
import { BoardsContext } from './context/BoardsContext'

import useGet from './hooks/useGet'

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
  // const { boards, dispatchBoards } = useContext(BoardsContext)
  // const { tasks, dispatchTasks } = useContext(TasksContext)

  // const { data: boards, getData: getBoards } = useGet('/boards')
  const { data: tasks, getData: getTasks } = useGet('/tasks')

  const location = useLocation()
  const { user } = useAuthContext()

  useEffect(() => {
    // getBoards()
    getTasks()
  }, [user])

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:board_id" element={<Board />} />
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

export default memo(App)