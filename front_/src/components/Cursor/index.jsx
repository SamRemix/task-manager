import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useCursorContext from '../../hooks/useCursorContext'

const Cursor = () => {
  const { printed } = useCursorContext()

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const [isOut, setIsOut] = useState(true)

  useEffect(() => {
    const event = (type, listener) => (
      window.addEventListener(type, listener)
    )

    event('mousemove', e => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    })

    event('mouseout', () => setIsOut(true))
    event('mouseover', () => setIsOut(false))
  }, [])

  return (
    <motion.div
      className={isOut ? 'cursor--out' : 'cursor'}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 60,
      }}
    // transition={{ damping: 6 }}
    >
      <div className="content">
        <AnimatePresence>
          {printed && (
            <motion.p
              className="content-item"
              {...config.activeItemAnimation}>
              {printed}
            </motion.p>
          )}
        </AnimatePresence>
        {/* <AnimatePresence mode='popLayout'>
          {items.map((item, i) => (
            item && <motion.p
              key={`${item}-cursor`}
              className="content-item"
              layoutId={`${item}-cursor`}
              {...config.activeItemAnimation}>
              {item}
            </motion.p>
          ))}
        </AnimatePresence> */}
      </div>
    </motion.div>
  )
}

export default memo(Cursor)