import { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import capitalize from '../../utils/capitalize'
import displayIcon from '../../utils/displayIcon'

const SingleBoard = ({ _id, title, favorite, icon, displayNavbar }) => {
  const { printItem, removeItem } = useCursorContext()

  return (
    <motion.li
      className="boards-item"
      layoutId={_id}
      {...config.singleBoardAnimation}>
      <NavLink
        to={`/boards/${_id}`}
        className="link"
        onMouseEnter={!displayNavbar ? () => printItem(title) : undefined}
        onMouseLeave={!displayNavbar ? () => removeItem(title) : undefined}>
        {displayIcon(icon, { className: 'icon', width: '1.375em' })}

        <AnimatePresence>
          {displayNavbar && (
            <motion.p
              className="title"
              {...config.boardTitleAnimation}>
              {capitalize(title)} {favorite && '*'}
            </motion.p>
          )}
        </AnimatePresence>
      </NavLink>
    </motion.li >
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
  displayNavbar: PropTypes.bool.isRequired,
}

export default memo(SingleBoard)