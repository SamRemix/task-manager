import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import useDisplayPassword from '../../hooks/useDisplayPassword'
import capitalize from '../../utils/capitalize'

import {
  HiOutlineMagnifyingGlass, // Search icon
  HiOutlineEyeSlash, // Hide password icon
  HiOutlineEye // Display password icon
} from 'react-icons/hi2'

const Input = ({ type, placeholder, value, onChange, maxLength, focus, error, setPrefix }) => {
  const { displayPassword, togglePassword } = useDisplayPassword()

  return (
    <div className={error ? 'input--error' : 'input'}>
      {type === 'text' && (
        <>
          <input
            type={type}
            placeholder={error ? error : capitalize(placeholder)}
            value={error ? '' : value}
            onChange={onChange}
            maxLength={maxLength}
            autoFocus={focus}
          />

          {maxLength && (
            <p className="remaining">
              {maxLength - value.length} remaining character{value.length < maxLength - 1 && 's'}
            </p>
          )}
        </>
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={capitalize(placeholder)}
          value={value}
          onChange={onChange}
        />
      )}

      {type === 'checkbox' && (
        <label>
          <input
            type={type}
            placeholder={capitalize(placeholder)}
            checked={value}
            onChange={onChange}
          />
          {capitalize(placeholder)}
        </label>
      )}

      {type === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={e => setPrefix(e.target.value)}
          />
          <div className="search-icon">
            <HiOutlineMagnifyingGlass size="1.6em" />
          </div>
        </>
      )}

      {type === 'password' && (
        <>
          <input
            type={displayPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <div
            className="eye-icon"
            onClick={togglePassword}>
            {displayPassword ? (
              <HiOutlineEyeSlash size="1.4em" />
            ) : (
              <HiOutlineEye size="1.4em" />
            )}
          </div>
        </>
      )}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onChange: PropTypes.func,
  maxLength: PropTypes.string,
  focus: PropTypes.bool,
  error: PropTypes.string,
  setPrefix: PropTypes.func,
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)