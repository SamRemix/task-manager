import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/global.scss'
import './styles/responsive.scss'

import { AuthProvider } from './contexts/AuthContext'
import { UserProvider } from './contexts/UserContext'
import { BoardsProvider } from './contexts/BoardsContext'
import { TasksProvider } from './contexts/TasksContext'
import { TagsProvider } from './contexts/TagsContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { CursorProvider } from './contexts/CursorContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <UserProvider>
      <BoardsProvider>
        <TasksProvider>
          <TagsProvider>
            <SettingsProvider>
              <CursorProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </CursorProvider>
            </SettingsProvider>
          </TagsProvider>
        </TasksProvider>
      </BoardsProvider>
    </UserProvider>
  </AuthProvider>
)