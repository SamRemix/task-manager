import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import BoardsItem from '../../components/BoardsItem'

const Boards = ({ boards }) => {

  return (
    <section className="container boards-page">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: .6 } }}
        exit={{ opacity: 0, transition: { duration: .4 } }}>
        Boards
      </motion.h1>

      <motion.div
        className="boards"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: .6 } }}
        exit={{ x: 80, opacity: 0, transition: { duration: .4 } }}>
        <nav>
          <ul>
            {boards && boards.map(({ _id, title }) => (
              <BoardsItem key={_id} path={_id} title={title} />
            ))}
          </ul>
        </nav>
      </motion.div>
    </section>
  )
}

Boards.propTypes = {
  boards: PropTypes.array.isRequired,
  // tasks: PropTypes.array.isRequired
}

export default Boards