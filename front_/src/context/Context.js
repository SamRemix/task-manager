import { AuthContextProvider } from './AuthContext'
import { TasksContextProvider } from './TasksContext'

const Context = ({ children }) => {
  return (
    <AuthContextProvider>
      <TasksContextProvider>
        {children}
      </TasksContextProvider>
    </AuthContextProvider>
  );
}

export default Context;