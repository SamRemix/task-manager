import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import NavbarItem from './NavbarItem'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [active, setActive] = useState(false)

  const openMenu = () => {
    active ? setActive(false) : setActive(true)
  }

  const resetActive = () => setActive(false)

  return (
    <>
      <div className={`navbar__toggle-btn ${active ? 'active' : ''}`} onClick={openMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar__border ${active ? 'active' : ''}`}></div>
      <nav className={`navbar ${active ? 'active' : ''}`}>
        <h1>Menu</h1>
        <ul className='navbar__list'>
          <NavbarItem path='/' title='Home' resetActive={resetActive} />
          {user ? <>
            <NavbarItem path='/task-board' title='Tasks' resetActive={resetActive} />
            <NavbarItem path='/account' title={user.name} resetActive={resetActive} />
            <li className='navbar__item'>
              <div className='navbar__item-link logout' onClick={() => logout()}>
                <p className='navbar__item-title'>Log Out</p>
              </div>
            </li>
          </> : <>
            <NavbarItem path='/login' title='Log In' resetActive={resetActive} />
            <NavbarItem path='/signup' title='Sign Up' resetActive={resetActive} />
          </>}
        </ul>
      </nav>
    </>
  )
}

export default Navbar