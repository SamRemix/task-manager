import './styles.scss'

import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import SingleBoard from '../SingleBoard'

import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import useSearch from '../../hooks/useSearch'
import useLogout from '../../hooks/useLogout'

import Input from '../Input'
import Button from '../Button'

import {
  HiOutlineFire,
  HiOutlineSun,
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineLockClosed, // Error icon (Request isn't authorized)
  HiOutlineClipboardDocumentList, // Boards icon
  // HiOutlineFolder, // Boards icon
  HiOutlineDocumentPlus, // Add board icon
  HiOutlineUsers, // Friends icon
  HiOutlineChatBubbleLeftRight, // Messages icon
  HiOutlineCalendar, // Calendar icon
  HiArrowLeftOnRectangle, // Logout icon
  HiArrowRightOnRectangle, // Login icon
  HiOutlineUserPlus // Signup icon 
} from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useAuthContext()
  const { boards, error } = useBoardsContext()
  const { theme, toggleTheme } = useThemeContext()
  const { setPrefix, search } = useSearch()
  const { logout } = useLogout()

  const [isOpen, setIsOpen] = useState(true)

  const displayMenu = () => {
    setIsOpen(isOpen => (
      isOpen ? false : true
    ))
  }

  return (
    <>
      <div className={theme === 'dark' ? 'dark-filter--active' : 'dark-filter'} />

      <div
        className={isOpen ? 'display-navbar--active' : 'display-navbar'}
        onClick={displayMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={isOpen ? 'navbar--active' : 'navbar'}>

        <div className="header">
          <div className="header-theme-switcher" onClick={toggleTheme}>
            {theme === 'light' ? (
              <HiOutlineFire size="1.6em" />
            ) : (
              <HiOutlineSun size="1.6em" />
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
                <HiOutlineUser size="1.6em" />
              )}
            </div>
            <NavLink to="/account" end>
              <Button type="default-2">
                <p>{user.name}</p>
              </Button>
            </NavLink>
          </div>
        )}

        <ul className="navbar__list">
          <div className="menu">
            <li className="navbar__list-item">
              <NavLink to="/" className="link">
                <HiOutlineHome className="icon" size="1.8em" />
                <h1 className="title">Home</h1>
              </NavLink>
            </li>

            {error && (
              <li className="navbar__list-item error-message">
                <HiOutlineLockClosed className="icon" size="1.8em" />
                <p className="title">{error}</p>
              </li>
            )}

            {user && !error && (
              <>
                <li className="navbar__list-item boards">
                  <div className="content">
                    <HiOutlineClipboardDocumentList className="icon" size="1.8em" />
                    <h1 className="title">Boards</h1>
                  </div>

                  <ul className="boards__list">
                    {boards.length >= 2 && (
                      <Input type="search" setPrefix={setPrefix} />
                    )}

                    <li className="boards__list-item" onClick={() => setIsOpen(false)}>
                      <NavLink to="/add-board" className="link">
                        <Button type="default">
                          <HiOutlineDocumentPlus className="icon" size="1.4em" />
                          <p className="title">Add board</p>
                        </Button>
                      </NavLink>
                    </li>

                    {search(boards).map(board => (
                      <SingleBoard key={board._id} {...board} setIsOpen={setIsOpen} />
                    ))}
                  </ul>
                </li>
                <li className="navbar__list-item soon">
                  <div className="link">
                    <HiOutlineUsers className="icon" size="1.8em" />
                    <p className="title">Friends</p>
                  </div>
                </li>
                <li className="navbar__list-item soon">
                  <div className="link">
                    <HiOutlineChatBubbleLeftRight className="icon" size="1.8em" />
                    <p className="title">Messages</p>
                  </div>
                </li>
                <li className="navbar__list-item soon">
                  <div className="link">
                    <HiOutlineCalendar className="icon" size="1.8em" />
                    <p className="title">Agenda</p>
                  </div>
                </li>
              </>
            )}
          </div>

          <div className="auth">
            {user ? (
              <li className="navbar__list-item">
                <div className="link" onClick={logout}>
                  <HiArrowLeftOnRectangle className="icon" size="1.8em" />
                  <p className="title">Log Out</p>
                </div>
              </li>
            ) : (
              <>
                <li className="navbar__list-item">
                  <NavLink to="/login" className="link">
                    <HiArrowRightOnRectangle className="icon" size="1.8em" />
                    <p className="title">Log In</p>
                  </NavLink>
                </li>

                <li className="navbar__list-item">
                  <NavLink to="/signup" className="link">
                    <HiOutlineUserPlus className="icon" size="1.8em" />
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