import './styles.scss'

import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import config from './motion.config'

import BoardsItem from '../../components/BoardsItem'

const Boards = ({ boards }) => {
  return (
    <section className="container boards-page">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Boards
      </motion.h1>

      <motion.div
        className="boards"
        {...config.boardsMenuAnimation}>
        <nav>
          <ul>
            {boards.map(({ _id, title }) => (
              <BoardsItem key={_id} path={_id} title={title} />
            ))}
          </ul>
        </nav>
      </motion.div>
    </section>
  )
}

Boards.propTypes = {
  boards: PropTypes.array.isRequired
}

export default Boards