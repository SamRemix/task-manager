import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import useAuthContext from './hooks/useAuthContext'
import useFetch from './hooks/useFetch'

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

  const { token, user } = useAuthContext()

  useFetch({
    method: 'get',
    url: '/user',
    type: 'LOGIN'
  })

  useFetch({
    method: 'get',
    url: '/boards',
    type: 'GET_BOARDS'
  })

  useFetch({
    method: 'get',
    url: '/tags',
    type: 'GET_TAGS'
  })

  return (
    <>
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/boards/:board_id" element={token && <BoardDetails />} />

          <Route path="/add-board" element={token && <AddBoard />} />

          <Route path="/tags" element={token && <Tags />} />

          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/account" element={token && <Account />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default memo(App)