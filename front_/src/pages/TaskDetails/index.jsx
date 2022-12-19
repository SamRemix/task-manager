import './styles.scss'

import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'
import { format } from 'date-fns'

import { Loader, Dimmer } from 'semantic-ui-react'
import useGet from '../../hooks/useGet'

const TaskDetails = () => {
  let { task_id } = useParams()

  const {
    loading,
    data: task,
    error,
    getData: getTask
  } = useGet(`/tasks/${task_id}`)

  useEffect(() => {
    getTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  }

  if (!task) return

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Task Details
      </motion.h1>

      <motion.div
        className="task-details"
        {...config.taskDetailsAnimation}>

        <h2 className="task-title">{task.title}</h2>

        {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}

        <div className="date">
          <p>Created: <span>{format(new Date(task.createdAt), 'PPPPpppp').split(' GMT')[0]}</span></p>
          {task.createdAt !== task.updatedAt && <p>Last update: <span>{format(new Date(task.updatedAt), 'PPPPpppp').split(' GMT')[0]}</span></p>}
        </div>

        <div className="buttons">
          <span className="material-symbols-outlined button button-edit">edit</span>
        </div>
      </motion.div>
    </section>
  )
}

export default memo(TaskDetails)