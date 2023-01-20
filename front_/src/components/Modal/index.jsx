import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'

import capitalize from '../../utils/capitalize'

import { HiXMark } from 'react-icons/hi2'

const Modal = ({ children, title, setIsOpen }) => {
  return (
    <>
      <div className="backdrop" onClick={() => setIsOpen(false)} />
      <div className="modal">
        <HiXMark className="modal-close" size="1.6em" onClick={() => setIsOpen(false)} />
        <div className="modal-content">
          <h1 className="modal-content-title">{capitalize(title)}</h1>
          {children}
        </div>
      </div>
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired
}

export default memo(Modal)