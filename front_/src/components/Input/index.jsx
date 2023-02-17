import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import useToggle from '../../hooks/useToggle'
import capitalize from '../../utils/capitalize'

import {
  MagnifyingGlassIcon, // Search icon
  EyeSlashIcon, // Hide password icon
  EyeIcon // Display password icon
} from '@heroicons/react/24/outline'

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
        <label className={checked ? 'checkbox-checked' : 'checkbox'}>
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
        <label className={checked ? 'radio-checked' : 'radio'}>
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
            <MagnifyingGlassIcon width="1.5em" />
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
            className="eye-icon"
            onClick={toggle}>
            {display ? (
              <EyeSlashIcon width="1.5em" />
            ) : (
              <EyeIcon width="1.5em" />
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
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  maxLength: PropTypes.string,
  focus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  error: PropTypes.any,
  setPrefix: PropTypes.func,
  key: PropTypes.string,
  name: PropTypes.string
}

Input.defaultProps = {
  type: 'text'
}

export default memo(Input)