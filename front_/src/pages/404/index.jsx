import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import setDocumentTitle from '../../utils/setDocumentTitle'

const NotFound = () => {
  setDocumentTitle('404')

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