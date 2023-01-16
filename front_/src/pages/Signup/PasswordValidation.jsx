import PropTypes from 'prop-types'
import { memo } from 'react'

import { HiCheckBadge, HiOutlineXMark } from 'react-icons/hi2'

const PasswordValidation = ({ password }) => {
  const checkLength = str => (
    str.length >= 8
  )

  const checkUppercase = str => (
    /[A-Z]/.test(str)
  )

  const checkLowercase = str => (
    /[a-z]/.test(str)
  )

  const checkNumber = str => (
    /\d/.test(str)
  )

  const checkSpecialChar = str => (
    /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(str)
    // /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
  )

  const isValid = () => (
    <HiCheckBadge size='1.6em' color='#1eb854' />
  )

  const isNotValid = () => (
    <HiOutlineXMark size='1.6em' style={{ strokeWidth: .9 }} />
  )

  return (
    <div className="validation">
      <p>Password must contain :</p>
      <ul>
        <li>
          {checkLength(password) ? isValid() : isNotValid()}
          <p>At least 8 characters</p>
        </li>
        <li>
          {checkUppercase(password) ? isValid() : isNotValid()}
          <p>At least 1 uppercase character</p>
        </li>
        <li>
          {checkLowercase(password) ? isValid() : isNotValid()}
          <p>At least 1 lowercase character</p>
        </li>
        <li>
          {checkNumber(password) ? isValid() : isNotValid()}
          <p>At least 1 number</p>
        </li>
        <li>
          {checkSpecialChar(password) ? isValid() : isNotValid()}
          <p>At least 1 special character</p>
        </li>
      </ul>
    </div>
  )
}

PasswordValidation.propTypes = {
  password: PropTypes.string.isRequired
}

export default memo(PasswordValidation)