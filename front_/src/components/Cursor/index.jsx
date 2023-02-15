import './styles.scss'

import { memo, useState, useEffect, useRef } from 'react'

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

  const cursor = useRef(null)

  useEffect(() => {
    const { addEventListener, innerWidth, innerHeight } = window

    const event = (type, listener) => (
      addEventListener(type, listener)
    )

    event('mousemove', ({ clientX, clientY }) => {
      const { offsetWidth, offsetHeight } = cursor.current

      const top = 32 // 2.5rem
      const left = 64 // 4rem
      const margin = 16 // 1rem

      const set = (inner, client, max, position) => (
        inner - client > max + position + margin ? (
          client + position
        ) : (
          client - max - position
        )
      )

      setPosition({
        x: set(innerWidth, clientX, offsetWidth, left),
        y: set(innerHeight, clientY, offsetHeight, top)
      })
    })

    event('mouseout', () => setIsOut(true))
    event('mouseover', () => setIsOut(false))
  }, [])

  return (
    <motion.div
      className={isOut ? 'cursor--out' : 'cursor'}
      ref={cursor}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 60,
      }}
    >
      <div className="content">
        <AnimatePresence>
          {printed && (
            <motion.p
              className="content-item"
              dangerouslySetInnerHTML={{ __html: printed }}
              {...config.activeItemAnimation}
            />
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