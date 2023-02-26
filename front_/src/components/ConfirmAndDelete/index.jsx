import './styles.scss'

import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import Button from '../Button'

const ConfirmAndDelete = ({ context, event }) => {
  const [confirm, setConfirm] = useState(false)

  return (
    <motion.div
      className={confirm ? 'delete-container-confirm' : ' delete-container'}
      layoutId={`delete-container-${context}`}
      {...config.deleteButtonAnimation}>
      <motion.div
        layoutId={`delete-${context}-button`}
        {...config.deleteButtonAnimation}>
        <Button
          type="delete"
          event={confirm ? event : () => setConfirm(true)}>
          {confirm ? 'Yes, delete' : 'Delete'} {context}
        </Button>
      </motion.div>

      <AnimatePresence mode='popLayout'>
        {confirm && (
          <motion.div
            layoutId={`cancel-delete-${context}-button`}
            {...config.cancelAnimation}>
            <Button
              type="secondary"
              event={() => setConfirm(false)}>
              Cancel
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirm && (
          <motion.p
            className="confirm-message"
            layoutId={`cancel-delete-${context}-message`}
            {...config.cancelAnimation}>
            Are you sure?
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

ConfirmAndDelete.propTypes = {
  context: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired
}

export default memo(ConfirmAndDelete)