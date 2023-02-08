import './styles.scss'

import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import config from './motion.config'

import { useThemeContext } from '../../hooks/useThemeContext'
import useAuthQueries from '../../hooks/useAuthQueries'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import useCursorContext from '../../hooks/useCursorContext'
import useToggle from '../../hooks/useToggle'

import SingleBoard from '../SingleBoard'
import Button from '../Button'

import {
  HiOutlineFire,
  HiOutlineSun,
  HiOutlineUser,
  HiOutlineHome,
  HiOutlineLockClosed, // Error icon (Request isn't authorized)
  HiOutlineClipboardDocumentList, // Boards icon
  // HiOutlineFolder, // Boards icon
  HiChevronDown,
  HiChevronUp,
  HiOutlineDocumentPlus, // Add board icon
  HiOutlineUsers, // Friends icon
  HiOutlineChatBubbleLeftRight, // Messages icon
  HiOutlineCalendar, // Calendar icon
  HiCodeBracket, // About icon
  HiArrowLeftOnRectangle, // Logout icon
  HiArrowRightOnRectangle, // Login icon
  HiOutlineUserPlus // Signup icon 
} from 'react-icons/hi2'

const Navbar = () => {
  const { user, logout } = useAuthQueries()
  const { boards, error } = useBoardsContext()
  const { theme, toggleTheme } = useThemeContext()
  const { addItem, removeItem } = useCursorContext()

  const { display: displayBoards, toggle: toggleBoards } = useToggle()
  const [displayNavbar, toggleNavbar] = useState(true)

  return (
    <>
      <div className={theme === 'dark' ? 'dark-filter--active' : 'dark-filter'} />

      <div
        className={displayNavbar ? 'navbar-button--active' : 'navbar-button'}
        onClick={() => {
          if (displayBoards && displayNavbar) {
            toggleBoards(false)
          }

          toggleNavbar(!displayNavbar)
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <LayoutGroup>
        <nav className={displayNavbar ? 'navbar--active' : 'navbar'}>
          <AnimatePresence>
            {displayNavbar && (
              <motion.div
                className="header"
                layoutId="header"
                {...config.userCardAnimation}>
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
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {user && displayNavbar && (
              <motion.div
                className="user-card"
                layoutId="user"
                {...config.userCardAnimation}>
                <div className="user-card-picture">
                  <HiOutlineUser size="1.6em" />
                </div>

                <NavLink to="/account" end>
                  <Button type="default">
                    <p>{user.name}</p>
                  </Button>
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="navbar-list">
            <div className="menu">
              <motion.li layoutId="home" className="navbar-list-item">
                <NavLink
                  to="/"
                  className="link"
                  onMouseEnter={!displayNavbar ? () => addItem('Home') : undefined}
                  onMouseLeave={() => removeItem('Home')}>
                  <HiOutlineHome className="icon" size="1.6em" />

                  <AnimatePresence>
                    {displayNavbar && (
                      <motion.p
                        className="title"
                        layoutId="homeTitle"
                        {...config.itemTitleAnimation}>
                        Home
                      </motion.p>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>

              <AnimatePresence>
                {error ? (
                  <motion.li
                    className="navbar-list-item error-message"
                    layoutId="error"
                    {...config.navbarItemAnimation}>
                    <div
                      className="link"
                      onMouseEnter={!displayNavbar ? () => addItem(error) : undefined}
                      onMouseLeave={() => removeItem(error)}>
                      <HiOutlineLockClosed className="icon" size="1.6em" />

                      <AnimatePresence>
                        {displayNavbar && (
                          <motion.p
                            className="title"
                            layoutId="errorMessage"
                            {...config.itemTitleAnimation}>
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ) : user && (
                  <>
                    <motion.li
                      className={!displayNavbar ? 'navbar-list-item disabled' : 'navbar-list-item'}
                      layoutId="boardsHeader"
                      {...config.navbarItemAnimation}>
                      <div
                        className={displayBoards ? 'link active' : 'link'}
                        onClick={displayNavbar ? toggleBoards : undefined}
                      // onMouseEnter={!displayNavbar ? (() => dispatch({ type: 'ACTIVE', payload: 'Boards' })) : undefined}
                      // onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'Boards' })}
                      >
                        <HiOutlineClipboardDocumentList className="icon" size="1.6em" />

                        <AnimatePresence>
                          {displayNavbar && (
                            <>
                              <motion.p
                                className="title"
                                layoutId="boardsTitle"
                                {...config.itemTitleAnimation}>
                                Boards
                              </motion.p>

                              {boards.length > 0 && (
                                <motion.div
                                  layoutId="boardsChevron"
                                  {...config.itemTitleAnimation}>
                                  {displayBoards ? (
                                    <HiChevronUp className="icon" size="1.2em" />
                                  ) : (
                                    <HiChevronDown className="icon" size="1.2em" />
                                  )}
                                </motion.div>
                              )}
                            </>
                          )}
                        </AnimatePresence>

                      </div>
                    </motion.li>
                    <AnimatePresence>
                      {displayBoards && (
                        <motion.li
                          className="navbar-list-item"
                          layoutId="boardsList"
                          {...config.navbarItemAnimation}>
                          <ul className="boards-list">
                            {boards.map(board => (
                              <SingleBoard key={board._id} {...board} />
                            ))}
                          </ul>
                        </motion.li>
                      )}
                    </AnimatePresence>
                    <motion.li
                      className="navbar-list-item"
                      layoutId="addBoard"
                      {...config.navbarItemAnimation}>
                      <NavLink
                        to="/add-board"
                        className="link"
                        onMouseEnter={!displayNavbar ? () => addItem('Add board') : undefined}
                        onMouseLeave={() => removeItem('Add board')}>
                        <HiOutlineDocumentPlus className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="addBoardsTitle"
                              {...config.itemTitleAnimation}>
                              Add board
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </motion.li>
                    <motion.li
                      className="navbar-list-item disabled"
                      layoutId="friends"
                      {...config.navbarItemAnimation}>
                      <div
                        className="link"
                      // onMouseEnter={!displayNavbar ? (() => dispatch({ type: 'ACTIVE', payload: 'Friends' })) : undefined}
                      // onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'Friends' })}
                      >
                        <HiOutlineUsers className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="friendsTitle"
                              {...config.itemTitleAnimation}>
                              Friends
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                    <motion.li
                      className="navbar-list-item disabled"
                      layoutId="messages"
                      {...config.navbarItemAnimation}>
                      <div
                        className="link"
                      // onMouseEnter={!displayNavbar ? (() => dispatch({ type: 'ACTIVE', payload: 'Messages' })) : undefined}
                      // onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'Messages' })}
                      >
                        <HiOutlineChatBubbleLeftRight className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="messagesTitle"
                              {...config.itemTitleAnimation}>
                              Messages
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                    <motion.li
                      className="navbar-list-item disabled"
                      layoutId="agenda"
                      {...config.navbarItemAnimation}>
                      <div
                        className="link"
                      // onMouseEnter={!displayNavbar ? (() => dispatch({ type: 'ACTIVE', payload: 'Agenda' })) : undefined}
                      // onMouseLeave={() => dispatch({ type: 'DISACTIVE', payload: 'Agenda' })}
                      >
                        <HiOutlineCalendar className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="agendaTitle"
                              {...config.itemTitleAnimation}>
                              Agenda
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="footer">
              <AnimatePresence>
                {user ? (
                  <motion.li
                    className="navbar-list-item"
                    layoutId="logout"
                    {...config.navbarItemAnimation}>
                    <div className="link" onClick={() => {
                      if (displayBoards) toggleBoards(false)
                      logout()
                    }}
                      onMouseEnter={!displayNavbar ? () => addItem('Log out') : undefined}
                      onMouseLeave={() => removeItem('Log out')}>
                      <HiArrowLeftOnRectangle className="icon" size="1.6em" />
                      <AnimatePresence>
                        {displayNavbar && (
                          <motion.p
                            className="title"
                            layoutId="logoutTitle"
                            {...config.itemTitleAnimation}>
                            Log out
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ) : (
                  <>
                    <motion.li
                      className="navbar-list-item"
                      layoutId="login"
                      {...config.navbarItemAnimation}>
                      <NavLink
                        to="/login"
                        className="link"
                        onMouseEnter={!displayNavbar ? () => addItem('Log in') : undefined}
                        onMouseLeave={() => removeItem('Log in')}>
                        <HiArrowRightOnRectangle className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="loginTitle"
                              {...config.itemTitleAnimation}>
                              Log in
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </motion.li>

                    <motion.li
                      className="navbar-list-item"
                      layoutId="signup"
                      {...config.navbarItemAnimation}>
                      <NavLink
                        to="/signup"
                        className="link"
                        onMouseEnter={!displayNavbar ? () => addItem('Sign up') : undefined}
                        onMouseLeave={() => removeItem('Sign up')}>
                        <HiOutlineUserPlus className="icon" size="1.6em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="signupTitle"
                              {...config.itemTitleAnimation}>
                              Sign up
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </motion.li>
                  </>
                )}
              </AnimatePresence>

              <motion.li
                className="navbar-list-item"
                layoutId="about"
                {...config.navbarItemAnimation}>
                <NavLink
                  to="/about"
                  className="link"
                  onMouseEnter={!displayNavbar ? () => addItem('About') : undefined}
                  onMouseLeave={() => removeItem('About')}>
                  <HiCodeBracket className="icon" size="1.6em" />
                  <AnimatePresence>
                    {displayNavbar && (
                      <motion.p
                        className="title"
                        layoutId="aboutTitle"
                        {...config.itemTitleAnimation}>
                        About
                      </motion.p>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>
            </div>
          </ul>
        </nav>
      </LayoutGroup>
    </>
  )
}

export default memo(Navbar)