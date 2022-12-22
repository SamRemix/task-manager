import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import './styles/global.scss'
import './styles/responsive.scss'

import App from './App'

import { AuthContextProvider } from './contexts/AuthContext'
import { BoardsContextProvider } from './contexts/BoardsContext'
import { TasksContextProvider } from './contexts/TasksContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthContextProvider>
    <BoardsContextProvider>
      <TasksContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TasksContextProvider>
    </BoardsContextProvider>
  </AuthContextProvider >
)