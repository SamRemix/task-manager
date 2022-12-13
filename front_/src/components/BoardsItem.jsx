import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BoardsItem = ({ path, title }) => {
  return (
    <li>
      <Link to={path}>
        <p>{title}</p>
      </Link>
    </li>
  )
}

BoardsItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BoardsItem