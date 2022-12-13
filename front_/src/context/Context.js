import { AuthContextProvider } from './AuthContext'
import { TasksContextProvider } from './TasksContext'
import { BoardsContextProvider } from './BoardsContext';

const Context = ({ children }) => {
  return (
    <AuthContextProvider>
      <BoardsContextProvider>
        <TasksContextProvider>
          {children}
        </TasksContextProvider>
      </BoardsContextProvider>
    </AuthContextProvider>
  );
}

export default Context;