import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

const Button = ({ children, type }) => {

  return (
    <div className={type}>
      {children}
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'default'
}

export default memo(Button)