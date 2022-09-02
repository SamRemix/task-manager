import { Link } from 'react-router-dom'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TaskList = ({ tasks, status, classTitle }) => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const deleteTask = async id => {
    if (!user) {
      return
    }

    const response = await fetch('/api/tasks/' + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json })
    }
  }

  return (
    <div className={'status ' + classTitle}>
      <h2 className="task-status">{status}</h2>
      {tasks.length > 0 && <div className="grid">
        {tasks.map(task => (
          <div
            className={
              task.importance === 1 ? 'task-content high-importance' :
                task.importance === 2 ? 'task-content medium-importance' :
                  'task-content low-importance'
            }
            key={task._id}
          >
            <p className="task-title">{task.title}</p>
            <p className="created-at"><i>{formatDistanceToNowStrict(new Date(task.createdAt))}</i></p>
            {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}
            <div className="buttons">
              <Link to={`/tasks/${task._id}`}>
                <span className="material-symbols-outlined button button-edit">edit</span>
              </Link>
              <span className="material-symbols-outlined button button-delete" onClick={() => deleteTask(task._id)}>delete</span>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default TaskList