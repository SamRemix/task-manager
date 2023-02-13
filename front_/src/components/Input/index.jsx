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

const Input = ({
  type,
  placeholder,
  value,
  checked,
  onChange,
  maxLength,
  focus,
  error,
  setPrefix,
  key,
  name
}) => {
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
            checked={checked}
            onChange={onChange}
            key={key}
          />
          {capitalize(placeholder)}
        </label>
      )}

      {type === 'radio' && (
        <label>
          <input
            type={type}
            name={name}
            value={value}
            checked={checked}
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
            value={value}
            onChange={e => setPrefix(e.target.value)}
            key={key}
            ref={focus}
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
  value: PropTypes.any,
  checked: PropTypes.any,
  onChange: PropTypes.func,
  maxLength: PropTypes.string,
  focus: PropTypes.bool,
  error: PropTypes.any,
  setPrefix: PropTypes.func,
  key: PropTypes.string,
  name: PropTypes.string
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)