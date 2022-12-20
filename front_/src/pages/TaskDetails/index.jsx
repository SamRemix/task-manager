import './styles.scss'

import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'
import { format } from 'date-fns'

import { Loader, Dimmer } from 'semantic-ui-react'
import useGet from '../../hooks/useGet'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

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

  const setDate = date => (
    format(new Date(date), 'PPPPpppp').split(' GMT')[0]
  )

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

        {task.description.trim().length !== 0 && <p className="description">{task.description}</p>}

        <div className="date">
          <p>Created: <span>{setDate(task.createdAt)}</span></p>
          {task.createdAt !== task.updatedAt && <p>Last update: <span>{setDate(task.updatedAt)}</span></p>}
        </div>

      </motion.div>
    </section>
  )
}

export default memo(TaskDetails)