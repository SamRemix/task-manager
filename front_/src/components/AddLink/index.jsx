import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

import { HiOutlineDocumentPlus } from 'react-icons/hi2'

const AddLink = ({ path, content }) => {
  return (
    <motion.div
      className="add__link"
      {...config.addLinkAnimation}>
      <Link to={path}>
        <HiOutlineDocumentPlus size="2em" className="add__link-button" />
        <p className="add__link-title">Add {content}</p>
      </Link>
    </motion.div>
  )
}

AddLink.propTypes = {
  path: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default memo(AddLink)