import { memo, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { AuthContext } from './contexts/AuthContext'

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

  const token = localStorage.getItem('token')

  // const { token } = useContext(AuthContext)

  const { loading, response: user, error } = useFetch({
    method: 'get',
    url: '/user',
    type: 'GET_CURRENT_USER'
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
          <Route path="/" element={<Home loading={loading} error={error} />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/boards/:board_id" element={user && <BoardDetails />} />

          <Route path="/add-board" element={user && <AddBoard />} />

          <Route path="/tags" element={user && <Tags />} />

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