import './styles.scss'

import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [active, setActive] = useState(false)

  const openMenu = () => {
    active ? setActive(false) : setActive(true)
  }

  return (
    <>
      <div className={`navbar__toggle-btn ${active ? 'active' : ''}`} onClick={openMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar__border ${active ? 'active' : ''}`}></div>
      <nav className={`navbar ${active ? 'active' : ''}`}>
        <h1 className="container__title">Menu</h1>
        <ul className='navbar__list'>
          <li className='navbar__item' onClick={() => setActive(false)}>
            <NavLink to='/' className='navbar__item-link'>
              <p className='navbar__item-title'>Home</p>
            </NavLink>
          </li>
          {user ? <>
            <li className='navbar__item' onClick={() => setActive(false)}>
              <NavLink to='/boards' className='navbar__item-link'>
                <p className='navbar__item-title'>Boards</p>
              </NavLink>
            </li>
            <li className='navbar__item' onClick={() => setActive(false)}>
              <NavLink to='/account' className='navbar__item-link'>
                <p className='navbar__item-title'>{user.name}</p>
              </NavLink>
            </li>
            <li className='navbar__item'>
              <div className='navbar__item-link logout' onClick={() => logout()}>
                <p className='navbar__item-title'>Log Out</p>
              </div>
            </li>
          </> : <>
            <li className='navbar__item' onClick={() => setActive(false)}>
              <NavLink to='/login' className='navbar__item-link'>
                <p className='navbar__item-title'>Log In</p>
              </NavLink>
            </li>
            <li className='navbar__item' onClick={() => setActive(false)}>
              <NavLink to='/signup' className='navbar__item-link'>
                <p className='navbar__item-title'>Sign Up</p>
              </NavLink>
            </li>
          </>}
        </ul>
      </nav>
    </>
  )
}

export default memo(Navbar)