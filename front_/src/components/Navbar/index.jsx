import './styles.scss'

import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import useAuth from '../../hooks/useAuth'

import { HiHome, HiClipboardDocumentList, HiUser, HiArrowLeftOnRectangle, HiCog8Tooth } from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useAuth()

  return (
    <>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__item-link">
              <div className="icon">
                <HiHome size="1.6em" />
              </div>
              <p className="title">Home</p>
            </NavLink>
          </li>
          {user ? <>
            <li className="navbar__item">
              <NavLink to="/boards" className="navbar__item-link">
                <div className="icon">
                  <HiClipboardDocumentList size="1.6em" />
                </div>
                <p className="title">Boards</p>
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/account" className="navbar__item-link">
                <div className="icon">
                  <HiUser size="1.6em" />
                </div>
                <p className="title">{user.name}</p>
              </NavLink>
            </li>
            {/* <li className="navbar__item">
              <div className="navbar__item-link">
                <div className="icon">
                  <HiCog8Tooth size="1.6em" />
                </div>
                <p className="title">Settings</p>
              </div>
            </li> */}
            <li className="navbar__item logout">
              <div className="navbar__item-link" onClick={() => logout()}>
                <div className="icon">
                  <HiArrowLeftOnRectangle size="1.6em" />
                </div>
                <p className="title">Log Out</p>
              </div>
            </li>
          </> : <>
            <li className="navbar__item">
              <NavLink to="/login" className="navbar__item-link">
                <p className="title">Log In</p>
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/signup" className="navbar__item-link">
                <p className="title">Sign Up</p>
              </NavLink>
            </li>
          </>}
        </ul>
      </nav>
    </>
  )
}

export default memo(Navbar)