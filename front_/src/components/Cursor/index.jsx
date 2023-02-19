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

    let windowSize = {
      width: innerWidth,
      height: innerHeight
    }

    event('resize', () => {
      windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })

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
        x: set(windowSize.width, clientX, offsetWidth, left),
        y: set(windowSize.height, clientY, offsetHeight, top)
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
              // span element can be set in printed item for bolder font weight
              // render html element (span)
              dangerouslySetInnerHTML={{ __html: printed }}
              {...config.activeItemAnimation}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default memo(Cursor)