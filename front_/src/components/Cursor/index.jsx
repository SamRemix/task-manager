import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

import { useHoverContext } from '../../contexts/HoverContext'

const Cursor = () => {
  const { active } = useHoverContext()

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
      animate={{ x: position.x, y: position.y }}>
      <div className="content">
        <LayoutGroup>
          <AnimatePresence mode='wait' initial={false}>
            {active && active.map((item, i) => (
              <motion.p
                key={i}
                // layoutId={item + i}
                className="content-item"
                initial={{
                  x: -20,
                  opacity: 0
                }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                exit={{
                  x: 20,
                  opacity: 0
                }}
                transition={{ duration: .2 }}>
                {item}
              </motion.p>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </motion.div>
  )
}

export default memo(Cursor)