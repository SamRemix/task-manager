import { memo, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

import useAuthQueries from './hooks/useAuthQueries'
import { useBoardsContext } from './hooks/useBoardsContext'

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

import About from './pages/About'

import NotFound from './pages/404'

const App = () => {
  const location = useLocation()

  const { token, user, dispatch } = useAuthQueries()
  const { dispatch: dispatchBoards } = useBoardsContext()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get('/user')

        dispatch({ type: 'LOGIN', payload: data })

      } catch (err) {
        // dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (token) {
      getCurrentUser()
    }
  }, [dispatch, token])

  useEffect(() => {
    const getBoards = async () => {
      dispatchBoards({ type: 'LOADING' })

      try {
        const { data } = await axios.get('/boards')

        dispatchBoards({ type: 'GET_BOARDS', payload: data })

      } catch (err) {
        dispatchBoards({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoards()
    }
  }, [dispatchBoards, token, user])

  return (
    <LayoutGroup>
      <>
        <Cursor />
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/boards/:board_id" element={user && <BoardDetails />} />
            <Route path="/add-board" element={user && <AddBoard />} />

            <Route path="/update-task/:task_id" element={user && <UpdateTask />} />

            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/account" element={user && <Account />} />

            <Route path="*" element={<NotFound />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </AnimatePresence>
      </>
    </LayoutGroup>
  )
}

export default memo(App)