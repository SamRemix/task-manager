import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { useAuthContext } from './hooks/useAuthContext'

// components
import Navbar from './components/Navbar'

// pages
import Home from './pages/Home'
import Tasks from './pages/Tasks'
// import TaskDetails from './pages/TaskDetails'
import AddTask from './pages/AddTask'
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
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App