// import { useState, useContext } from 'react'

// import { TasksContext } from '../contexts/TasksContext'

// import axios from '../axios.config'

// const useTasksContext = () => {
//   const [loading, setLoading] = useState('')
//   const [error, setError] = useState('')

//   const { tasks, dispatch } = useContext(TasksContext)

//   const addTask = async props => {
//     try {
//       const { data } = await axios.post('/tasks', props)

//       dispatch({ type: 'CREATE_TASK', payload: data })
//     } catch (err) {
//       setError(err.response.data.error)
//       console.log(err.response.data.error);
//     }
//   }

//   return { tasks, loading, setLoading, error, setError, addTask, dispatch }
// }

// export default useTasksContext