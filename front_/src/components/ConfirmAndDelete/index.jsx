import './styles.scss'

import { memo, useState } from 'react'
import PropTypes from 'prop-types'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import config from './motion.config'

import Button from '../Button'

const ConfirmAndDelete = ({ context, event }) => {
  const [confirm, setConfirm] = useState(false)

  return (
    <div className={confirm ? 'tips delete-container-confirm' : ' tips delete-container'}>
      <LayoutGroup>
        <motion.div
          layoutId={`delete-${context}-button`}
          {...config.deleteButtonAnimation}>
          <Button
            type="delete"
            event={confirm ? event : () => setConfirm(true)}>
            Delete {context}
          </Button>
        </motion.div>

        <AnimatePresence>
          {confirm && (
            <>
              <motion.div
                layoutId={`cancel-delete-${context}-button`}
                {...config.cancelButtonAnimation}>
                <Button event={() => setConfirm(false)}>Cancel</Button>
              </motion.div>

              <motion.p
                className="confirm-message"
                {...config.confirmMessageAnimation}>
                Are you sure?
              </motion.p>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}

ConfirmAndDelete.propTypes = {
  context: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired
}

export default memo(ConfirmAndDelete)