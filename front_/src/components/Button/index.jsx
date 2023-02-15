import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

// import { motion } from 'framer-motion'
// import config from './motion.config'

import { HiArrowLongLeft } from 'react-icons/hi2'

const Button = ({ children, type, event }) => {
  const navigate = useNavigate()
  return (
    <>
      {['default', 'green', 'form-button', 'delete'].includes(type) && (
        <button className={type} onClick={event}>
          {children}
        </button>
      )}

      {type === 'back' && (
        <button
          className={type}
          onClick={() => navigate(-1)}>
          <HiArrowLongLeft size="1.6em" />
          Back
        </button>
      )}
    </>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  event: PropTypes.func
}

Button.defaultProps = {
  type: 'default',
  event: null
}

export default memo(Button)