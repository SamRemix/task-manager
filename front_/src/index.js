import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import './styles/global.scss'
import './styles/responsive.scss'

import App from './App'

import { AuthContextProvider } from './contexts/AuthContext'
// import { DataProvider } from './contexts/DataContext'
import { BoardsContextProvider } from './contexts/BoardsContext'
import { TasksContextProvider } from './contexts/TasksContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <AuthContextProvider>
    <BoardsContextProvider>
      <TasksContextProvider>
        {/* <DataProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </DataProvider> */}
      </TasksContextProvider>
    </BoardsContextProvider>
  </AuthContextProvider >
)