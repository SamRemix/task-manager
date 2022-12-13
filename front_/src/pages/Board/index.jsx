import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import NotFound from '../404'
import ProgressBar from '../../components/ProgressBar'
import Tasks from '../../components/Tasks'

const Board = ({ boards, tasks }) => {
  let { board_id } = useParams()

  const [prefix, setPrefix] = useState('')

  const board = boards.find(({ _id }) => _id === board_id)
  const filteredTasks = tasks.filter(({ board_id: id }) => id === board_id)

  if (!board) {
    return <NotFound />
  }

  const search = data => {
    return data.filter(({ title }) => (
      title.toLowerCase().startsWith(prefix.toLowerCase())
    ))
  }

  return (
    <section className="container boards-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        {board.title}
      </motion.h1>

      {!tasks && <p className="loading">Loading...</p>}

      <motion.div
        className="add-task-link"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ x: -80, opacity: 0, transition: { duration: .4 } }}>
        <Link to={`/add-task/${board_id}`}>
          <span className="material-symbols-outlined icon">playlist_add</span>
          <p className="title">Add Task</p>
        </Link>
      </motion.div>

      {filteredTasks && <ProgressBar tasks={filteredTasks} />}

      <motion.div
        className="js-function"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <div className="search">
          <input className="search-bar" placeholder="Search" onChange={e => setPrefix(e.target.value)} />
          <span className="material-symbols-outlined button icon-search">search</span>
        </div>
      </motion.div>

      {filteredTasks && <Tasks tasks={search(filteredTasks)} />}
    </section>
  )
}

Board.propTypes = {
  boards: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired
}

export default Board