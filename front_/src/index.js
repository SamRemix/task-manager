import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/global.scss'
import './styles/responsive.scss'

import { AuthContextProvider } from './contexts/AuthContext'
import { BoardsContextProvider } from './contexts/BoardsContext'
import { TasksContextProvider } from './contexts/TasksContext'
import { ThemeContextProvider } from './contexts/ThemeContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <BoardsContextProvider>
        <TasksContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TasksContextProvider>
      </BoardsContextProvider>
    </AuthContextProvider >
  </ThemeContextProvider>
)