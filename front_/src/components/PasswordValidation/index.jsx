import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { HiCheckBadge, HiOutlineXMark } from 'react-icons/hi2'

import verifyPassword from '../../utils/verifyPassword'

const PasswordValidation = ({ password }) => {
  const {
    verifyLength,
    verifyUppercase,
    verifyLowercase,
    verifyNumber,
    verifySpecialChar
  } = verifyPassword(password)

  const isValid = () => (
    <HiCheckBadge size='1.6em' color='#1eb854' />
  )

  const isNotValid = () => (
    <HiOutlineXMark size='1.6em' />
  )

  return (
    <div className="validation">
      <p>Password must contain :</p>
      <ul>
        <li>
          {verifyLength() ? isValid() : isNotValid()}
          <p>At least 8 characters</p>
        </li>
        <li>
          {verifyUppercase() ? isValid() : isNotValid()}
          <p>At least 1 uppercase character</p>
        </li>
        <li>
          {verifyLowercase() ? isValid() : isNotValid()}
          <p>At least 1 lowercase character</p>
        </li>
        <li>
          {verifyNumber() ? isValid() : isNotValid()}
          <p>At least 1 number</p>
        </li>
        <li>
          {verifySpecialChar() ? isValid() : isNotValid()}
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