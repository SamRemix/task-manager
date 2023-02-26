import './styles.scss'

import { memo } from 'react'

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

export default memo(Header)