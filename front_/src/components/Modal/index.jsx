import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import { HiXMark } from 'react-icons/hi2'

const Modal = ({ children, type, error, toggle }) => {
  return (
    <>
      {!type ? (
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
            <div className="modal-content">
              {children}
            </div>
          </motion.div>
        </div>
      ) : type === 'message' && (
        <motion.div
          className={error ? 'modal-message-error' : 'modal-message'}
          {...config.modalAnimation}>
          <div className="modal-message-content">
            {children}
          </div>
          <HiXMark
            className="modal-message-close"
            onClick={toggle}
            size="1.4em"
          />
        </motion.div>
      )}
    </>
  )
}

Modal.propTypes = {
  type: PropTypes.string,
  toggle: PropTypes.func.isRequired
}

export default memo(Modal)