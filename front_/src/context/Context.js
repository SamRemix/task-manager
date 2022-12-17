import { AuthContextProvider } from './AuthContext'
// import { TasksContextProvider } from './TasksContext'
// import { BoardsContextProvider } from './BoardsContext'
import { BoardsContext, useBoardsReducer } from './BoardsContext'
import { TasksContext, useTasksReducer } from './TasksContext'

const Context = ({ children }) => {
  const [boards, dispatchBoards] = useBoardsReducer()
  const [tasks, dispatchTasks] = useTasksReducer()

  return (
    <AuthContextProvider>
      <BoardsContext.Provider value={{ ...boards, dispatchBoards }}>
        <TasksContext.Provider value={{ ...tasks, dispatchTasks }}>
          {children}
        </TasksContext.Provider>
      </BoardsContext.Provider>
    </AuthContextProvider>
  );
}

export default Context;