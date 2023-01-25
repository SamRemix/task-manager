import PropTypes from 'prop-types'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import capitalize from '../../utils/capitalize'

import { HiOutlineDocumentText } from 'react-icons/hi2'

const SingleBoard = ({ _id, title, setIsOpen }) => {
  return (
    <li className="boards__list-item" onClick={() => setIsOpen(false)}>
      <NavLink to={`/boards/${_id}`} className="link" end>
        <HiOutlineDocumentText className="icon" size="1.4em" style={{ strokeWidth: 1.1 }} />
        <p className="title">{capitalize(title)}</p>
      </NavLink>
    </li>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default memo(SingleBoard)