import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/global.scss'
import './styles/responsive.scss'

import { AuthProvider } from './contexts/AuthContext'
import { BoardsProvider } from './contexts/BoardsContext'
import { TasksProvider } from './contexts/TasksContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { HoverProvider } from './contexts/HoverContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <BoardsProvider>
      <TasksProvider>
        <ThemeProvider>
          <HoverProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HoverProvider>
        </ThemeProvider>
      </TasksProvider>
    </BoardsProvider>
  </AuthProvider>
)