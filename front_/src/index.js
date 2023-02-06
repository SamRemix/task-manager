import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/global.scss'
import './styles/responsive.scss'

import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { BoardsProvider } from './contexts/BoardsContext'
import { TasksProvider } from './contexts/TasksContext'

import { HoverProvider } from './contexts/HoverContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <ThemeProvider>
    <AuthProvider>
      <BoardsProvider>
        <TasksProvider>
          <HoverProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HoverProvider>
        </TasksProvider>
      </BoardsProvider>
    </AuthProvider >
  </ThemeProvider>
)