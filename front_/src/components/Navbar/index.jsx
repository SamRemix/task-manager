import './styles.scss'

import { memo, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import { AuthContext } from '../../contexts/AuthContext'
import { UsersContext } from '../../contexts/UsersContext'
import { BoardsContext } from '../../contexts/BoardsContext'

import useLogout from '../../hooks/useLogout'
import useSettingsContext from '../../hooks/useSettingsContext'
import useCursorContext from '../../hooks/useCursorContext'

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
  const [displayBoards, toggleBoards] = useState(false)
  const [displayNavbar, toggleNavbar] = useState(true)

  const { token } = useContext(AuthContext)
  const { user } = useContext(UsersContext)
  const { boards } = useContext(BoardsContext)

  const { logout } = useLogout()
  const { theme, switchTheme } = useSettingsContext()
  const { printItem, removeItem } = useCursorContext()

  return (
    <>
      <div
        className={displayNavbar ? 'navbar-button--active' : 'navbar-button'}
        onClick={() => toggleNavbar(!displayNavbar)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={displayNavbar ? 'navbar--active' : 'navbar'}>
        <AnimatePresence>
          {displayNavbar && (
            <motion.div
              className="navbar-header"
              layoutId="navbar-item-header"
              {...config.headerAnimation}>
              <div className="navbar-header-theme-switcher" onClick={() => {
                switchTheme(theme === 'light' ? 'dark' : 'light')
              }}>
                {theme === 'light' ? (
                  <MoonIcon width="1.75em" />
                ) : (
                  <SunIcon width="1.75em" />
                )}
              </div>

              <div className="navbar-header-lang-switcher">
                <p>fr - en</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {token && user && displayNavbar && (
            <motion.div
              className="user-card"
              layoutId="navbar-item-user"
              {...config.headerAnimation}>
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
            <motion.li
              className="navbar-list-item"
              layoutId="navbar-item-home"
              {...config.navbarItemAnimation}>
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
                      {...config.itemTitleAnimation}>
                      Home
                    </motion.p>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.li>

            <AnimatePresence>
              {token && user && (
                <>
                  <motion.li
                    // className={!displayNavbar ? 'navbar-list-item disabled' : 'navbar-list-item'}
                    className="navbar-list-item"
                    layoutId="navbar-item-boardsHeader"
                    {...config.navbarItemAnimation}>
                    <div
                      className={`link boards${displayBoards ? ' active' : ''}${displayNavbar ? ' open' : ''}`}
                      onClick={() => toggleBoards(!displayBoards)}
                      onMouseEnter={!displayNavbar ? () => printItem('Boards') : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem('Boards') : undefined}>
                      <ClipboardDocumentListIcon className="icon" width="1.75em" />
                      <AnimatePresence mode='popLayout'>
                        {displayNavbar && (
                          <motion.p
                            className="title"
                            {...config.itemTitleAnimation}>
                            Boards
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {boards.length > 0 && (
                        <motion.div
                          layoutId="navbar-item-boardsChevron"
                          {...config.itemTitleAnimation}>
                          {displayBoards ? (
                            <ChevronUpIcon className="icon" width="1.25em" />
                          ) : (
                            <ChevronDownIcon className="icon" width="1.25em" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.li>

                  <AnimatePresence mode='popLayout'>
                    {displayBoards && (
                      <motion.li
                        className="navbar-list-item"
                        layoutId="navbar-item-boardsList"
                        {...config.navbarItemAnimation}>
                        <ul className={displayNavbar ? 'boards-list open' : 'boards-list'}>
                          {boards.map(board => (
                            <SingleBoard
                              key={board._id}
                              {...board}
                              displayNavbar={displayNavbar}
                            />
                          ))}
                        </ul>
                      </motion.li>
                    )}
                  </AnimatePresence>

                  <motion.li
                    className="navbar-list-item"
                    layoutId="navbar-item-addBoard"
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
                            {...config.itemTitleAnimation}>
                            Add board
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="navbar-list-item"
                    layoutId="navbar-item-tags"
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
                            {...config.itemTitleAnimation}>
                            Tags
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="navbar-list-item disabled"
                    layoutId="navbar-item-friends"
                    {...config.navbarItemAnimation}>
                    <div
                      className="link"
                      onMouseEnter={!displayNavbar ? () => printItem('Soon') : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem('Soon') : undefined}>
                      <UsersIcon className="icon" width="1.75em" />
                      <AnimatePresence>
                        {displayNavbar && (
                          <motion.p
                            className="title"
                            {...config.itemTitleAnimation}>
                            Friends
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>

                  <motion.li
                    className="navbar-list-item disabled"
                    layoutId="navbar-item-messages"
                    {...config.navbarItemAnimation}>
                    <div
                      className="link"
                      onMouseEnter={!displayNavbar ? () => printItem('Soon') : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem('Soon') : undefined}>
                      <ChatBubbleLeftRightIcon className="icon" width="1.75em" />
                      <AnimatePresence>
                        {displayNavbar && (
                          <motion.p
                            className="title"
                            {...config.itemTitleAnimation}>
                            Messages
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>

                  <motion.li
                    className="navbar-list-item disabled"
                    layoutId="navbar-item-agenda"
                    {...config.navbarItemAnimation}>
                    <div
                      className="link"
                      onMouseEnter={!displayNavbar ? () => printItem('Soon') : undefined}
                      onMouseLeave={!displayNavbar ? () => removeItem('Soon') : undefined}>
                      <CalendarIcon className="icon" width="1.75em" />
                      <AnimatePresence>
                        {displayNavbar && (
                          <motion.p
                            className="title"
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
              layoutId="navbar-item-settings"
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
                      {...config.itemTitleAnimation}>
                      Settings
                    </motion.p>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.li>

            <motion.li
              className="navbar-list-item"
              layoutId="navbar-item-about"
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
                      {...config.itemTitleAnimation}>
                      About
                    </motion.p>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.li>

            <motion.li
              className="navbar-list-item disabled"
              layoutId="navbar-item-doc"
              {...config.navbarItemAnimation}>
              <div
                className="link"
                onMouseEnter={!displayNavbar ? () => printItem('Soon') : undefined}
                onMouseLeave={!displayNavbar ? () => removeItem('Soon') : undefined}>
                <CodeBracketIcon className="icon" width="1.75em" />
                <AnimatePresence>
                  {displayNavbar && (
                    <motion.p
                      className="title"
                      {...config.itemTitleAnimation}>
                      Doc
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          </div>

          <div className="footer">
            <AnimatePresence>
              {token && user ? (
                <motion.li
                  className="navbar-list-item"
                  layoutId="navbar-item-logout"
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
                    layoutId="navbar-item-login"
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
                            {...config.itemTitleAnimation}>
                            Log in
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </motion.li>

                  <motion.li
                    className="navbar-list-item"
                    layoutId="navbar-item-signup"
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
          </div>
        </ul>
      </nav>
    </>
  )
}

export default memo(Navbar)