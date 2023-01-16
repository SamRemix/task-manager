import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'

const Cursor = () => {
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
      animate={{
        x: position.x - 40,
        y: position.y - 40
      }} />
  )
}

export default memo(Cursor)