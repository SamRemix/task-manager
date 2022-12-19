import './styles.scss'

import PropTypes from 'prop-types'
import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'

import { useAuthContext } from '../../hooks/useAuthContext'
import useGet from '../../hooks/useGet'

import Item from './Item'

const Boards = () => {
  const { user } = useAuthContext()
  const { data: boards, getData: getBoards } = useGet('/boards')

  useEffect(() => {
    getBoards()
  }, [user])

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
            {boards && boards.map(({ _id, title }) => (
              <Item key={_id} path={_id} title={title} />
            ))}
          </ul>
        </nav>
      </motion.div>
    </section>
  )
}

// Boards.propTypes = {
//   boards: PropTypes.array.isRequired
// }

export default memo(Boards)