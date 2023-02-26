import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

const Button = ({ children, type, event }) => {
  const navigate = useNavigate()
  return (
    <>
      {['primary', 'secondary', 'form-button', 'delete'].includes(type) && (
        <button
          className={type}
          onClick={event}>
          {children}
        </button>
      )}

      {type === 'back' && (
        <button
          className="secondary"
          onClick={() => navigate(-1)}>
          <ArrowLongLeftIcon width="2em" />
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
  type: 'primary',
  event: null
}

export default memo(Button)