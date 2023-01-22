import PropTypes from 'prop-types'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import capitalize from '../../utils/capitalize'

import { HiOutlineDocumentText } from 'react-icons/hi2'

const SingleBoard = ({ _id, title }) => {
  return (
    <li className="boards__list-item">
      <NavLink to={`/boards/${_id}`} className="link" end>
        <HiOutlineDocumentText className="icon" size="1.4em" style={{ strokeWidth: 1.1 }} />
        <p className="title">{capitalize(title)}</p>
      </NavLink>
    </li>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default memo(SingleBoard)