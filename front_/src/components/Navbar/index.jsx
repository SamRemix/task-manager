import './styles.scss'

import { memo, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useBoardsContext } from "../../hooks/useBoardsContext"
import { useThemeContext } from '../../hooks/useThemeContext'

import useAuth from '../../hooks/useAuth'

import axios from '../../axios.config'

import {
  HiSparkles,
  HiSun,
  HiHome,
  HiClipboardDocumentList,
  HiOutlineClipboardDocumentList,
  HiDocumentPlus,
  HiUser,
  HiCog8Tooth,
  HiArrowRightOnRectangle,
  HiUserPlus,
  HiArrowLeftOnRectangle,
} from 'react-icons/hi2'

const Navbar = () => {
  const { user } = useAuthContext()
  const { boards, error, dispatch } = useBoardsContext()

  const { theme, toggleTheme } = useThemeContext()

  const { logout } = useAuth()

  useEffect(() => {
    const getBoards = async () => {
      dispatch({ type: 'LOADING' })

      try {
        const response = await axios.get('/boards')

        dispatch({ type: 'GET_BOARDS', payload: response.data })
      } catch (err) {
        dispatch({ type: 'ERROR', payload: err.response.data.error })
      }
    }

    if (user) {
      getBoards()
    }
  }, [dispatch, user])

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className={`dark-filter${theme === 'dark' ? ' active' : ''}`} />
      <nav className="navbar">
        <div className="header">
          <div className="header-theme-switcher" onClick={toggleTheme}>
            {theme === 'light' ? (
              <HiSun size="1.6em" />
            ) : (
              <HiSparkles size="1.6em" />
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
            <div className="user__card-infos">
              <NavLink to="/account" className="link" end>
                <div className="user__card-infos-name">
                  <p>{user.name}</p>
                </div>
              </NavLink>
              <div className="user__card-infos-bio">
                <p>{user.bio}</p>
              </div>
            </div>
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
            {user && (
              <>
                <li className="navbar__list-item">
                  <div className="content">
                    <div className="icon">
                      <HiClipboardDocumentList size="1.6em" />
                    </div>
                    <p className={`title${!boards ? ' empty' : ''}`}>Boards</p>
                  </div>
                  {Array.isArray(boards) && (
                    <ul className="boards__list">
                      {boards.map(board => (
                        <li key={board._id} className="boards__list-item">
                          <NavLink to={`/boards/${board._id}`} className="link" end>
                            <div className="icon">
                              <HiOutlineClipboardDocumentList size="1.2em" />
                            </div>
                            <p className="title">{board.title}</p>
                          </NavLink>
                        </li>
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
                <li className="navbar__list-item">
                  <div className="content">
                    <div className="icon">
                      <HiCog8Tooth size="1.6em" />
                    </div>
                    <p className="title">Settings</p>
                  </div>
                </li>
              </>
            )}
            <div className="focus"></div>
          </div>
          <div className="auth">
            {user ? (
              <li className="navbar__list-item">
                <div className="link" onClick={() => logout()}>
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