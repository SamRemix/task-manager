import './styles.scss'

import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import SingleBoard from '../SingleBoard'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import { useThemeContext } from '../../hooks/useThemeContext'

import useAuth from '../../hooks/useAuth'

import {
  HiSparkles,
  HiSun,
  HiHome,
  HiClipboardDocumentList,
  HiDocumentPlus,
  HiUser,
  HiLockClosed,
  // HiCog8Tooth,
  HiArrowRightOnRectangle,
  HiUserPlus,
  HiArrowLeftOnRectangle,
} from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useAuthContext()
  const { boards, error } = useBoardsContext()
  const { theme, toggleTheme } = useThemeContext()

  const { logout } = useAuth()

  return (
    <>
      <div className={`dark-filter${theme === 'dark' ? ' active' : ''}`} />
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
              <HiUser size="1.6em" />
            </div>

            <NavLink to="/account" end>
              <p className="user__card-name">{user.name}</p>
            </NavLink>
          </div>
        )}

        <ul className="navbar__list">
          <div className="menu">
            <li
              className="navbar__list-item">
              <NavLink to="/" className="link">
                <div className="icon">
                  <HiHome size="1.6em" />
                </div>
                <p className="title">Home</p>
              </NavLink>
            </li>

            {error && (
              <li className="navbar__list-item error-message">
                <div className="icon">
                  <HiLockClosed size="1.6em" />
                </div>
                <p className="title">{error}</p>
              </li>
            )}

            {user && !error && (
              <li className="navbar__list-item boards">
                <div className="content">
                  <div className="icon">
                    <HiClipboardDocumentList size="1.6em" />
                  </div>
                  <p className="title">Boards</p>
                </div>

                {/* {Array.isArray(boards) && ( */}
                {boards && (
                  <ul className="boards__list">
                    {boards.map(board => (
                      <SingleBoard key={board._id} {...board} />
                    ))}

                    <li className="boards__list-item">
                      <NavLink to="/add-board" className="link">
                        <div className="icon">
                          <HiDocumentPlus size="1.2em" />
                        </div>
                        <p className="title">Add board</p>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              // <li className="navbar__list-item">
              //   <div className="content">
              //     <div className="icon">
              //       <HiCog8Tooth size="1.6em" />
              //     </div>
              //     <p className="title">Settings</p>
              //   </div>
              // </li>
            )}
          </div>

          <div className="auth">
            {user ? (
              <li className="navbar__list-item">
                <div className="link" onClick={logout}>
                  <div className="icon">
                    <HiArrowLeftOnRectangle size="1.6em" />
                  </div>
                  <p className="title">Log Out</p>
                </div>
              </li>
            ) : (
              <>
                <li className="navbar__list-item">
                  <NavLink to="/login" className="link">
                    <div className="icon">
                      <HiArrowRightOnRectangle size="1.6em" />
                    </div>
                    <p className="title">Log In</p>
                  </NavLink>
                </li>

                <li className="navbar__list-item">
                  <NavLink to="/signup" className="link">
                    <div className="icon">
                      <HiUserPlus size="1.6em" />
                    </div>
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