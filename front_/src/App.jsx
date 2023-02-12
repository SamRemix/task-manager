import { memo, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import useAuthQueries from './hooks/useAuthQueries'
import { useBoardsContext } from './hooks/useBoardsContext'
import useTagsContext from './hooks/useTagsContext'

import axios from './axios.config'

// components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

// pages
import Home from './pages/Home'
import BoardDetails from './pages/BoardDetails'
import AddBoard from './pages/AddBoard'
// import UpdateTask from './pages/UpdateTask'
import Tags from './pages/Tags'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Account from './pages/Account'
import About from './pages/About'
import NotFound from './pages/404'

import { TasksProvider } from './contexts/TasksContext'

const App = () => {
  const location = useLocation()

  const { token, user, dispatch } = useAuthQueries()
  const { dispatch: dispatchBoards } = useBoardsContext()
  const { setError, getTags, dispatch: dispatchTags } = useTagsContext()

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

  useEffect(() => {
    if (user) {
      getTags()
    }
  }, [dispatchTags, token, user])

  return (
    <>
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/boards/:board_id" element={user && (
            <TasksProvider>
              <BoardDetails />
            </TasksProvider>
          )} />
          <Route path="/add-board" element={user && <AddBoard />} />

          {/* <Route path="/update-task/:task_id" element={user && <UpdateTask />} /> */}

          <Route path="/tags" element={user && <Tags />} />

          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/account" element={user && <Account />} />

          <Route path="*" element={<NotFound />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default memo(App)