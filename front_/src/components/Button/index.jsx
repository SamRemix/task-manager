import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { HiArrowLongLeft } from 'react-icons/hi2'

const Button = ({ children, type, event }) => {
  const navigate = useNavigate()
  return (
    <>
      {type !== 'back' ? (
        <button className={type} onClick={event}>
          {children}
        </button>
      ) : (
        <motion.button
          className="back"
          onClick={() => navigate(-1)}
          {...config.backButtonAnimation}>
          <HiArrowLongLeft size="1.6em" />
          Back
        </motion.button>
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