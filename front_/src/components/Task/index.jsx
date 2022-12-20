import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import config from './motion.config'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDistanceToNowStrict } from 'date-fns'

import useDelete from '../../hooks/useDelete'

import { HiOutlineDocumentText, HiOutlineTrash } from 'react-icons/hi2'

// import fr from 'date-fns/esm/locale/fr'
// format(new Date(task.createdAt), 'PPPPpppp', { locale: fr })

const Task = ({ _id, title, important, createdAt }) => {
  const { loading, data: task, error, deleteData } = useDelete(`/tasks/${_id}`)

  const location = useLocation()

  return (
    <AnimatePresence>
      <motion.div
        className={`task__content ${important && 'important'}`}
        layoutId={_id}
        {...config.singleTaskAnimation}>

        <p className="task__content-title">{title}</p>
        <p className="task__content-date">{formatDistanceToNowStrict(new Date(createdAt))}</p>

        <div className="task__content-buttons-container">
          <Link className="button" to={`${location.pathname}/${_id}`}>
            <HiOutlineDocumentText size="1.4em" className="button-details" />
            <p className="button-title">Details</p>
          </Link>
          <div className="button">
            <HiOutlineTrash size="1.4em" className="button-delete" onClick={() => deleteData()} />
            <p className="button-title">Delete</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

Task.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default memo(Task)