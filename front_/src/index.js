import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import './styles/variables.scss'
import './styles/layout.scss'
import './styles/navbar.scss'
import './styles/home.scss'
import './styles/tasks.scss'
import './styles/form.scss'
import './styles/account.scss'

import './styles/responsive.scss'

import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { TasksContextProvider } from './context/TasksContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  // App component access to the TaskContext
  <AuthContextProvider>
    <TasksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TasksContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
)