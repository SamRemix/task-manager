import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const cursorPosition = e => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', cursorPosition)
  }, [])

  const variants = {
    default: {
      x: position.x - 20,
      y: position.y - 20
    }
  }

  return (
    <motion.div
      className="cursor"
      animate={{
        x: position.x - 40,
        y: position.y - 40,
        // transition: { duration: 0, ease: 'linear' }
      }} />
  )
}

export default memo(Cursor)