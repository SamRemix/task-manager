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

    let windowSize = {
      width: innerWidth,
      height: innerHeight
    }

    addEventListener('resize', () => {
      windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })

    addEventListener('mousemove', ({ clientX, clientY }) => {
      const set = ({ inner, client, max, position }) => (
        // 16 = margin: 1rem
        inner - client > max + position + 16 ? (
          client + position
        ) : (
          client - max - position
        )
      )

      setPosition({
        x: set({
          inner: windowSize.width,
          client: clientX,
          max: cursor.current?.offsetWidth,
          position: 64 // left: 4rem
        }),
        y: set({
          inner: windowSize.height,
          client: clientY,
          max: cursor.current?.offsetHeight,
          position: 32 // top: 2.5rem
        }),
      })
    })

    addEventListener('mouseout', () => setIsOut(true))
    addEventListener('mouseover', () => setIsOut(false))
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