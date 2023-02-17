import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { XMarkIcon } from '@heroicons/react/24/outline'

const Modal = ({ children, toggle }) => {
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
        <XMarkIcon
          className="modal-close"
          onClick={toggle}
          width="2.5em"
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