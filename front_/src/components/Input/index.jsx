import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import useToggle from '../../hooks/useToggle'
import capitalize from '../../utils/capitalize'

import {
  HiOutlineMagnifyingGlass, // Search icon
  HiOutlineEyeSlash, // Hide password icon
  HiOutlineEye // Display password icon
} from 'react-icons/hi2'

const Input = ({ type, placeholder, value, onChange, maxLength, focus, error, setPrefix, key }) => {
  const { display, toggle } = useToggle()

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
            key={key}
          />

          {maxLength && (
            <p className="remaining">
              {maxLength - value.length} remaining character{value.length < maxLength - 1 && 's'}.
            </p>
          )}
        </>
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={capitalize(placeholder)}
          value={value}
          onChange={onChange}
          key={key}
        />
      )}

      {type === 'checkbox' && (
        <label>
          <input
            type={type}
            // placeholder={capitalize(placeholder)}
            checked={value}
            onChange={onChange}
            key={key}
          />
          {capitalize(placeholder)}
        </label>
      )}

      {type === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search"
            onChange={e => setPrefix(e.target.value)}
            key={key}
          />
          <div className="search-icon">
            <HiOutlineMagnifyingGlass size="1.6em" />
          </div>
        </>
      )}

      {type === 'password' && (
        <>
          <input
            type={display ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            key={key}
          />
          <div
            className={display ? 'eye-icon--display' : 'eye-icon'}
            onClick={toggle}>
            {display ? (
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
  key: PropTypes.string
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)