import { AuthContextProvider } from './AuthContext'
// import { TasksContextProvider } from './TasksContext'
// import { BoardsContextProvider } from './BoardsContext'
import { TasksContext, useTasksReducer } from './TasksContext'

const Context = ({ children }) => {
  const [tasks, dispatchTasks] = useTasksReducer()

  return (
    <AuthContextProvider>
      <TasksContext.Provider value={{ ...tasks, dispatchTasks }}>
        {children}
      </TasksContext.Provider>
    </AuthContextProvider>
  );
}

export default Context;