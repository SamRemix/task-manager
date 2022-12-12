import { NavLink } from 'react-router-dom'

const NavbarItem = ({ path, resetActive, title }) => {
  return (
    <li className='navbar__item' onClick={resetActive}>
      <NavLink to={path} className='navbar__item-link' end>
        <p className='navbar__item-title'>{title}</p>
      </NavLink>
    </li>
  )
}

export default NavbarItem