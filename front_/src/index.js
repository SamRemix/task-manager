import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/global.scss'
import './styles/responsive.scss'

import { AuthProvider } from './contexts/AuthContext'
import { BoardsProvider } from './contexts/BoardsContext'
import { TasksProvider } from './contexts/TasksContext'
import { TagsProvider } from './contexts/TagsContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { CursorProvider } from './contexts/CursorContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <BoardsProvider>
      {/* <TasksProvider> */}
      <TagsProvider>
        <ThemeProvider>
          <CursorProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CursorProvider>
        </ThemeProvider>
      </TagsProvider>
      {/* </TasksProvider> */}
    </BoardsProvider>
  </AuthProvider>
)