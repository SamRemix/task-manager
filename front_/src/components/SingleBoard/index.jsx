import { memo } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

import capitalize from '../../utils/capitalize'

const SingleBoard = ({ _id, title, favorite }) => {

  return (
    <motion.li
      className="boards-item"
      layoutId={_id}
      {...config.singleBoardAnimation}>
      <NavLink to={`/boards/${_id}`} className="link">
        {favorite ? (
          <DocumentTextIcon className="icon" width="1.5em" />
        ) : (
          <DocumentIcon className="icon" width="1.5em" />
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