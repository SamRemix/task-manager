import PropTypes from 'prop-types'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

const SingleBoard = ({ _id, title }) => {
  return (
    <li className="boards__list-item">
      <NavLink to={`/boards/${_id}`} className="link" end>
        <HiOutlineClipboardDocumentList className="icon" size="1.2em" />
        <p className="title">{title}</p>
      </NavLink>
    </li>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default memo(SingleBoard)