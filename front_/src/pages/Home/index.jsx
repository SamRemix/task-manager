import { memo, useEffect } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'

import useDocumentTitle from '../../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Home')



  return (
    <section className="container home">
      <motion.h1 {...config.pageTitleAnimation}>
        Task Manager
      </motion.h1>
    </section>
  )
}

export default memo(Home)