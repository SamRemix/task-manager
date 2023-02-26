import './styles.scss'

import { memo } from 'react'
// import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

const Header = ({ children }) => {
  return (
    <motion.header
      className="header"
      {...config.headerAnimation}>
      {children}
    </motion.header>
  )
}

Header.propTypes = {}

export default memo(Header)