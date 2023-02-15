import './styles.scss'

import React from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

import capitalize from '../../utils/capitalize'

const SingleTag = ({ _id, title, setTagId, toggle }) => {
  const { removeItem, printItem } = useCursorContext()

  return (
    <motion.div
      className="tag"
      layoutId={_id}
      {...config.tagAnimation}>
      <p className="tag-title">{capitalize(title)}</p>
      <div className="tag-footer">
        <div className="button"
          onClick={() => {
            setTagId(_id)
            toggle()
          }}
          onMouseEnter={() => printItem('Update')}
          onMouseLeave={() => removeItem('Update')}>
          <HiOutlinePencilSquare size="1.4em" className="button-update" />
        </div>
      </div>
    </motion.div>
  )
}

SingleTag.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setTagId: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
}

export default SingleTag