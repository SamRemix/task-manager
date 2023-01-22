import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

const Button = ({ children, type, event, disabled }) => {
  return (
    <button className={type} onClick={event} disabled={disabled}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  event: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  type: 'default', // Other possible value = 'form-button'
  event: null
}

export default memo(Button)