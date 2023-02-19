import { memo, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import useAuthContext from './hooks/useAuthContext'
import { useBoardsContext } from './hooks/useBoardsContext'
import useTagsContext from './hooks/useTagsContext'

import axios from './axios.config'

// components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Settings from './pages/Settings'
import BoardDetails from './pages/BoardDetails'
import AddBoard from './pages/AddBoard'
import Tags from './pages/Tags'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Account from './pages/Account'
import NotFound from './pages/404'

const App = () => {
  const location = useLocation()

  const { token, user, dispatch } = useAuthContext()
  const { dispatch: dispatchBoards } = useBoardsContext()
  const { getTags, dispatch: dispatchTags } = useTagsContext()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get('/user')

        dispatch({ type: 'LOGIN', payload: data })

      } catch ({ response }) {
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

      } catch ({ response }) {
        dispatchBoards({ type: 'ERROR', payload: response.data.error })
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
          <Route path="/settings" element={<Settings />} />

          <Route path="/boards/:board_id" element={user && <BoardDetails />} />

          <Route path="/add-board" element={user && <AddBoard />} />

          <Route path="/tags" element={user && <Tags />} />

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