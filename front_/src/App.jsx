import { memo, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { useAuthContext } from './hooks/useAuthContext'
import { useBoardsContext } from './hooks/useBoardsContext'
import { useThemeContext } from './hooks/useThemeContext'

import axios from './axios.config'

// components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

// pages
import Home from './pages/Home'

import BoardDetails from './pages/BoardDetails'
import AddBoard from './pages/AddBoard'

import UpdateTask from './pages/UpdateTask'

import Signup from './pages/Signup'
import Login from './pages/Login'
import Account from './pages/Account'

import NotFound from './pages/404'

const App = () => {
  const location = useLocation()

  const { user, dispatch } = useAuthContext()
  const { dispatch: dispatch_boards } = useBoardsContext()
  const { theme } = useThemeContext()

  useEffect(() => {
    const getUser = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const { data } = await axios.get('/user')

        dispatch({ type: 'LOGIN', payload: data })

      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    getUser()
  }, [dispatch])

  useEffect(() => {
    const getBoards = async () => {
      dispatch_boards({ type: 'LOADING' })

      try {
        const { data } = await axios.get('/boards')

        dispatch_boards({ type: 'GET_BOARDS', payload: data })

      } catch (err) {
        dispatch_boards({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoards()
    }
  }, [dispatch_boards, user])

  return (
    <>
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />

          <Route path="/boards/:board_id" element={user && <BoardDetails />} />
          <Route path="/add-board" element={user && <AddBoard />} />

          <Route path="/update-task/:task_id" element={user && <UpdateTask />} />

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