import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const BoardsItem = ({ _id, title }) => {
  return (
    <li>
      <Link to={_id}>
        <p>{title}</p>
      </Link>
    </li>
  )
}

BoardsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default memo(BoardsItem)