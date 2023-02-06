import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'

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
      {active && (
        <p className="active-status">{active}</p>
      )}
    </motion.div>
  )
}

export default memo(Cursor)