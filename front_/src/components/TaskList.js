import TaskDetails from './TaskDetails'

const TaskList = ({ tasks, status, classTitle }) => {

  return (
    <div className={'status ' + classTitle}>
      <h2 className="task-status">{status}</h2>
      {tasks.length > 0 && <div className="grid">
        {tasks.map(task => <TaskDetails task={task} key={task._id} />)}
      </div>}
    </div>
  )
}

export default TaskList