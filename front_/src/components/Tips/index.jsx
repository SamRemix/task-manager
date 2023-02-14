import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

const Tips = ({ children, classname }) => {
  return (
    <div className={classname ? `tips ${classname}` : 'tips'}>
      {children}
    </div>
  )
}

Tips.propTypes = {
  classname: PropTypes.string
}

// Tips.defaultProps = {
//   classname: ''
// }

export default memo(Tips)