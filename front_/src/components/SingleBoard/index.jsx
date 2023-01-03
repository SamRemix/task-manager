import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { HiOutlineClipboardDocumentList, HiOutlineCog6Tooth } from 'react-icons/hi2'

const SingleBoard = ({ _id, title }) => {
  return (
    <li className="boards__list-item">
      <NavLink to={`/boards/${_id}`} className="link" end>
        <div className="icon">
          <HiOutlineClipboardDocumentList size="1.2em" />
        </div>
        <p className="title">{title}</p>
      </NavLink>
      <NavLink to={`/boards/${_id}/settings`} className="link-settings" end>
        <HiOutlineCog6Tooth size="1.2em" color="#888" />
        <p className="title">Settings</p>
      </NavLink>
    </li>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default memo(SingleBoard)