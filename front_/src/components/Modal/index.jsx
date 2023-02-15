import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { HiXMark } from 'react-icons/hi2'

const Modal = ({ children, type, error, toggle }) => {
  return (
    <div className="modal-container">
      <motion.div
        className="backdrop"
        onClick={toggle}
        {...config.backdropAnimation}>
      </motion.div>
      <motion.div
        className="modal"
        {...config.modalAnimation}>
        <HiXMark
          className="modal-close"
          onClick={toggle}
          size="2em"
        />
        {children}
      </motion.div>
    </div>
  )
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired
}

export default memo(Modal)