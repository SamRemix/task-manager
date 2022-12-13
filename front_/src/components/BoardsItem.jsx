import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const BoardsItem = ({ path, title }) => {
  return (
    <li>
      <NavLink to={path} end>
        <p>{title}</p>
      </NavLink>
    </li>
  )
}

BoardsItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BoardsItem