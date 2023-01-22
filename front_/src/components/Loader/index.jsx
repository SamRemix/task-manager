import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

const Loader = ({ size, color }) => {
  return (
    <div
      className="loader"
      style={{
        width: size,
        height: size,
        background: color
      }} />
  )
}

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
}

Loader.defaultProps = {
  size: '4em',
}

export default memo(Loader)