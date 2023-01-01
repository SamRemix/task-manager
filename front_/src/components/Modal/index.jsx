import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

const Modal = ({ message, display, children }) => {
  return (
    <motion.div
      className="backdrop"
      onClick={display}
      {...config.backdropAnimation}>
      <motion.div
        className="modal"
        {...config.modalAnimation}>
        <p className="modal-message">{message}</p>
        <div className="modal-content">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  display: PropTypes.func.isRequired
}

export default Modal