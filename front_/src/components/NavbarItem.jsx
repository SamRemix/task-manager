import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavbarItem = ({ path, title, resetActive }) => {
  return (
    <li className='navbar__item' onClick={resetActive}>
      <NavLink to={path} className='navbar__item-link'>
        <p className='navbar__item-title'>{title}</p>
      </NavLink>
    </li>
  )
}

NavbarItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  resetActive: PropTypes.func.isRequired
}

export default NavbarItem