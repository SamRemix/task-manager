import './styles.scss'

import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

import { PencilSquareIcon } from '@heroicons/react/24/outline'

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
          <PencilSquareIcon width="1.5em" className="button-update" />
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

export default memo(SingleTag)