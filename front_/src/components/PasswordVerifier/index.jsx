import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import tests from './testPassword'

import {
  CheckBadgeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const PasswordVerifier = ({ password }) => {
  const attr = {
    className: 'icon',
    width: '1.75rem'
  }

  return (
    <div className="tips validation">
      <p>Password must contain :</p>
      <ul>
        {tests.map(({ condition, action }, i) => (
          <li key={i}>
            {action(password) ? (
              <CheckBadgeIcon {...attr} />
            ) : <XMarkIcon {...attr} />}
            <p>At least {condition}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

PasswordVerifier.propTypes = {
  password: PropTypes.string.isRequired
}

export default memo(PasswordVerifier)