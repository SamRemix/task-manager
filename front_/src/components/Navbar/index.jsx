import './styles.scss'

import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import SingleBoard from '../SingleBoard'

import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'

import useLogout from '../../hooks/useLogout'

import Button from '../Button'

import {
  HiSparkles,
  HiSun,
  HiUser,
  HiHome,
  HiLockClosed, // Error icon (Request isn't authorized)
  HiClipboardDocumentList, // Boards icon
  HiDocumentPlus, // Add board icon
  HiArrowLeftOnRectangle, // Logout icon
  HiArrowRightOnRectangle, // Login icon
  HiUserPlus // Signup icon 
} from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useAuthContext()
  const { boards, error } = useBoardsContext()
  const { theme, toggleTheme } = useThemeContext()

  const { logout } = useLogout()

  return (
    <>
      <div className={theme === 'dark' ? 'dark-filter--active' : 'dark-filter'} />

      <nav className="navbar">
        <div className="header">
          <div className="header-theme-switcher" onClick={toggleTheme}>
            {theme === 'light' ? (
              <HiSparkles size="1.6em" />
            ) : (
              <HiSun size="1.6em" />
            )}
          </div>

          <div className="header-lang-switcher">
            <p>fr - en</p>
          </div>
        </div>

        {user && (
          <div className="user__card">
            <div className="user__card-picture">
              {user.profilePicture ? (
                <></>
              ) : (
                <HiUser size="1.6em" />
              )}
            </div>
            <NavLink to="/account" end>
              <Button>
                <p>{user.name}</p>
              </Button>
            </NavLink>
          </div>
        )}

        <ul className="navbar__list">
          <div className="menu">
            <li className="navbar__list-item">
              <NavLink to="/" className="link">
                <HiHome className="icon" size="1.6em" />
                <h1 className="title">Home</h1>
              </NavLink>
            </li>

            {error && (
              <li className="navbar__list-item error-message">
                <HiLockClosed className="icon" size="1.6em" />
                <p className="title">{error}</p>
              </li>
            )}

            {user && !error && (
              <li className="navbar__list-item boards">
                <div className="content">
                  <HiClipboardDocumentList className="icon" size="1.6em" />
                  <h1 className="title">Boards</h1>
                </div>

                {boards && (
                  <ul className="boards__list">
                    {boards.map(board => (
                      <SingleBoard key={board._id} {...board} />
                    ))}

                    <li className="boards__list-item">
                      <NavLink to="/add-board" className="link">
                        <HiDocumentPlus className="icon" size="1.2em" />
                        <p className="title">Add board</p>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </div>

          <div className="auth">
            {user ? (
              <li className="navbar__list-item">
                <div className="link" onClick={logout}>
                  <HiArrowLeftOnRectangle className="icon" size="1.6em" />
                  <p className="title">Log Out</p>
                </div>
              </li>
            ) : (
              <>
                <li className="navbar__list-item">
                  <NavLink to="/login" className="link">
                    <HiArrowRightOnRectangle className="icon" size="1.6em" />
                    <p className="title">Log In</p>
                  </NavLink>
                </li>

                <li className="navbar__list-item">
                  <NavLink to="/signup" className="link">
                    <HiUserPlus className="icon" size="1.6em" />
                    <p className="title">Sign Up</p>
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
    </>
  )
}

export default memo(Navbar)