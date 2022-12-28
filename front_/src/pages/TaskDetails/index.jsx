import './styles.scss'

import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { format } from 'date-fns'

// import useTasksRequests from '../../hooks/useTasksRequests'
import { useTasksContext } from "../../hooks/useTasksContext"
import axios from '../../axios.config'

import { Loader } from 'semantic-ui-react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

const TaskDetails = () => {
  let { task_id } = useParams()

  // const { loading, tasks: task, error, getTask } = useTasksRequests()
  const { loading, tasks: task, error, dispatch } = useTasksContext()

  useEffect(() => {
    const getTask = async id => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await axios.get(`/tasks/${id}`)

        dispatch({ type: 'GET_TASKS', payload: response.data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    getTask(task_id)
  }, [task_id, dispatch])

  if (loading) {
    return <Loader active content="Loading" />
  }

  // if (!task) return

  if (error) {
    return <p>{error}</p>
  }

  const setDate = date => {
    if (date) {
      return format(new Date(date), 'PPPPpppp').split(' GMT')[0]
    }
  }

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Task Details
      </motion.h1>

      <motion.div
        className="task__details"
        {...config.taskDetailsAnimation}>
        <div className="task__details-header">
          <div className="task__details-header-button">
            <HiOutlinePencilSquare size="1.6em" />
            <p className="button-title">Update</p>
          </div>
          <h2 className="task__details-header-title">{task.title}</h2>
        </div>

        {String(task.description).trim().length !== 0 && <p className="description">{task.description}</p>}

        <div className="date">
          <p>Created: <span>{setDate(task.createdAt)}</span></p>
          {task.createdAt !== task.updatedAt && <p>Last update: <span>{setDate(task.updatedAt)}</span></p>}
        </div>

      </motion.div>
    </section>
  )
}

export default memo(TaskDetails)