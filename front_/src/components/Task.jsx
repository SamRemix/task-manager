import PropTypes from 'prop-types'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { formatDistanceToNowStrict } from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'

// import fr from 'date-fns/esm/locale/fr'
// format(new Date(task.createdAt), 'PPPPpppp', { locale: fr })

const Task = ({ _id, title, importance, updatedAt }) => {
  const location = useLocation()

  // const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const deleteTask = id => {
    try {
      axios.delete(`/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className={
          (importance === 1 ? 'task-content high-importance' :
            importance === 2 ? 'task-content medium-importance' :
              'task-content low-importance')
        }
        layoutId={_id}
        animate={{ opacity: 1, transition: { duration: .4 } }}
        exit={{ opacity: 0 }}>

        <p className="task-title">{title}</p>
        <p className="updated-at"><i>{formatDistanceToNowStrict(new Date(updatedAt))}</i></p>

        <div className="buttons">
          <Link to={`${location.pathname}/${_id}`}>
            <span className="material-symbols-outlined button button-details">description</span>
          </Link>
          <span className="material-symbols-outlined button button-delete" onClick={() => deleteTask(_id)}>delete</span>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}

Task.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired,
  updatedAt: PropTypes.string.isRequired
}

export default Task