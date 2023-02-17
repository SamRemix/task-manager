import './styles.scss'

import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import config from './motion.config'

import useThemeContext from '../../hooks/useThemeContext'
import useAuthQueries from '../../hooks/useAuthQueries'
import { useBoardsContext } from '../../hooks/useBoardsContext'
import useCursorContext from '../../hooks/useCursorContext'
import useToggle from '../../hooks/useToggle'

import SingleBoard from '../SingleBoard'
import Button from '../Button'

import {
  MoonIcon, // dark theme icon
  SunIcon, // light theme icon
  UserIcon,
  HomeIcon,
  LockClosedIcon, // error icon (Request isn't authorized)
  ClipboardDocumentListIcon, // boards icon
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentPlusIcon, // add board icon
  UsersIcon, // friends icon
  ChatBubbleLeftRightIcon, // messages icon
  CalendarIcon, // calendar icon
  TagIcon, // tags icon
  Cog6ToothIcon, // settings icon
  InformationCircleIcon, // about icon
  CodeBracketIcon, // doc icon
  ArrowLeftOnRectangleIcon, // logout icon
  ArrowRightOnRectangleIcon, // login icon
  UserPlusIcon  // signup icon 
} from '@heroicons/react/24/outline'

// 12k 3.5k

const Navbar = () => {
  const { user, logout } = useAuthQueries()
  const { boards, error } = useBoardsContext()
  const { theme, switchTheme } = useThemeContext()
  const { printItem, removeItem } = useCursorContext()

  const { display: displayBoards, toggle: toggleBoards } = useToggle()
  const [displayNavbar, toggleNavbar] = useState(true)

  return (
    <>
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
                <div className="header-theme-switcher" onClick={switchTheme}>
                  {theme === 'light' ? (
                    <MoonIcon width="1.75em" />
                  ) : (
                    <SunIcon width="1.75em" />
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
                  <UserIcon width="1.75em" />
                </div>

                <NavLink to="/account" end>
                  <Button>
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
                  onMouseEnter={!displayNavbar ? () => printItem('Home') : undefined}
                  onMouseLeave={!displayNavbar ? () => removeItem('Home') : undefined}>
                  <HomeIcon className="icon" width="1.75em" />

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
                      onMouseEnter={!displayNavbar ? () => printItem(error) : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem(error) : undefined}>
                      <LockClosedIcon className="icon" width="1.75em" />

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
                        <ClipboardDocumentListIcon className="icon" width="1.75em" />

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
                                    <ChevronUpIcon className="icon" width="1.25em" />
                                  ) : (
                                    <ChevronDownIcon className="icon" width="1.25em" />
                                  )}
                                </motion.div>
                              )}
                            </>
                          )}
                        </AnimatePresence>

                      </div>
                    </motion.li>

                    <AnimatePresence mode='popLayout'>
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
                        onMouseEnter={!displayNavbar ? () => printItem('Add board') : undefined}
                        onMouseLeave={!displayNavbar ? () => removeItem('Add board') : undefined}>
                        <DocumentPlusIcon className="icon" width="1.75em" />
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
                      className="navbar-list-item"
                      layoutId="tags"
                      {...config.navbarItemAnimation}>
                      <NavLink
                        to="/tags"
                        className="link"
                        onMouseEnter={!displayNavbar ? () => printItem('Tags') : undefined}
                        onMouseLeave={!displayNavbar ? () => removeItem('Tags') : undefined}>
                        <TagIcon className="icon" width="1.75em" />
                        <AnimatePresence>
                          {displayNavbar && (
                            <motion.p
                              className="title"
                              layoutId="tagsTitle"
                              {...config.itemTitleAnimation}>
                              Tags
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </motion.li>

                    <motion.li
                      className="navbar-list-item disabled"
                      layoutId="friends"
                      {...config.navbarItemAnimation}>
                      <div className="link">
                        <UsersIcon className="icon" width="1.75em" />
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
                      <div className="link">
                        <ChatBubbleLeftRightIcon className="icon" width="1.75em" />
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
                      <div className="link">
                        <CalendarIcon className="icon" width="1.75em" />
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

              <motion.li
                className="navbar-list-item"
                layoutId="settings"
                {...config.navbarItemAnimation}>
                <NavLink
                  to="/settings"
                  className="link"
                  onMouseEnter={!displayNavbar ? () => printItem('Settings') : undefined}
                  onMouseLeave={!displayNavbar ? () => removeItem('Settings') : undefined}>
                  <Cog6ToothIcon className="icon" width="1.75em" />
                  <AnimatePresence>
                    {displayNavbar && (
                      <motion.p
                        className="title"
                        layoutId="settingsTitle"
                        {...config.itemTitleAnimation}>
                        Settings
                      </motion.p>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.li>
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
                      onMouseEnter={!displayNavbar ? () => printItem('Log out') : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem('Log out') : undefined}>
                      <ArrowLeftOnRectangleIcon className="icon" width="1.75em" />
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
                        onMouseEnter={!displayNavbar ? () => printItem('Log in') : undefined}
                        onMouseLeave={!displayNavbar ? () => removeItem('Log in') : undefined}>
                        <ArrowRightOnRectangleIcon className="icon" width="1.75em" />
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
                        onMouseEnter={!displayNavbar ? () => printItem('Sign up') : undefined}
                        onMouseLeave={!displayNavbar ? () => removeItem('Sign up') : undefined}>
                        <UserPlusIcon className="icon" width="1.75em" />
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
                  onMouseEnter={!displayNavbar ? () => printItem('About') : undefined}
                  onMouseLeave={!displayNavbar ? () => removeItem('About') : undefined}>
                  <InformationCircleIcon className="icon" width="1.75em" />
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

              <motion.li
                className="navbar-list-item disabled"
                layoutId="doc"
                {...config.navbarItemAnimation}>
                <NavLink
                  to="/doc"
                  className="link"
                  onMouseEnter={!displayNavbar ? () => printItem('Doc') : undefined}
                  onMouseLeave={!displayNavbar ? () => removeItem('Doc') : undefined}>
                  <CodeBracketIcon className="icon" width="1.75em" />
                  <AnimatePresence>
                    {displayNavbar && (
                      <motion.p
                        className="title"
                        layoutId="docTitle"
                        {...config.itemTitleAnimation}>
                        Doc
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