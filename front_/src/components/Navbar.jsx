import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__item'>
          <NavLink to='/' className='navbar__item-link'>
            <span className='material-symbols-outlined navbar__item-icon'>home</span>
            <p className='navbar__item-title'>Home</p>
          </NavLink>
        </li>
        {/* USER LOGGED */}
        {user ? <>
          <li className='navbar__item'>
            <NavLink to='/tasks' className='navbar__item-link' end>
              <span className='material-symbols-outlined navbar__item-icon'>checklist</span>
              <p className='navbar__item-title'>Tasks</p>
            </NavLink>
          </li>
          <li className='navbar__item'>
            <NavLink to='/account' className='navbar__item-link' end>
              <span className='material-symbols-outlined navbar__item-icon'>person</span>
              <p className='navbar__item-title'>{user.name}</p>
            </NavLink>
          </li>
          <li className='navbar__item'>
            <div className='logout' onClick={handleClick}>
              <span className='material-symbols-outlined navbar__item-icon'>logout</span>
              <p className='navbar__item-title'>Log Out</p>
            </div>
          </li>
        </> : <>
          {/* USER NOT LOGGED */}
          <li className='navbar__item'>
            <NavLink to='/login' className='navbar__item-link' end>
              <span className='material-symbols-outlined navbar__item-icon'>login</span>
              <p className='navbar__item-title'>Log In</p>
            </NavLink>
          </li>
          <li className='navbar__item'>
            <NavLink to='/signup' className='navbar__item-link' end>
              <span className='material-symbols-outlined navbar__item-icon'>person_add</span>
              <p className='navbar__item-title'>Sign Up</p>
            </NavLink>
          </li>
        </>}
        <li className='navbar__item'>
          <NavLink to='/404-test' className='navbar__item-link' end>
            <span className='material-symbols-outlined navbar__item-icon'>error</span>
            <p className='navbar__item-title'>404</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar