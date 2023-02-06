import { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { HiOutlineDocument, HiOutlineDocumentText } from 'react-icons/hi2'

import capitalize from '../../utils/capitalize'

const SingleBoard = ({ _id, title, favorite }) => {

  return (
    <motion.li
      className="boards-item"
      layoutId={_id}
      {...config.singleBoardAnimation}>
      <NavLink to={`/boards/${_id}`} className="link">
        {favorite ? (
          <HiOutlineDocumentText className="icon" size="1.4em" />
        ) : (
          <HiOutlineDocument className="icon" size="1.4em" />
        )}

        <p className="title">{capitalize(title)}</p>
      </NavLink>
    </motion.li>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  favorite: PropTypes.bool
}

export default memo(SingleBoard)