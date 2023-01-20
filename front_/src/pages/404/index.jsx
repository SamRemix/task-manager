import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useDocumentTitle from '../../hooks/useDocumentTitle'

const NotFound = () => {
  useDocumentTitle('404')

  return (
    <section className="container not-found">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        404
      </motion.h1>
      <motion.p
        {...config.errorMessageAnimation}>
        Page Not Found
      </motion.p>
    </section>
  )
}

export default memo(NotFound)