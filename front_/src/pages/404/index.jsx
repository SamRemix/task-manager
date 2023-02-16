import { memo } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import Header from '../../components/Header'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const NotFound = () => {
  setDocumentTitle('404')

  return (
    <section className="container not-found">
      <Header>
        <h1 className="title">404</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <motion.p
          {...config.errorMessageAnimation}>
          Page Not Found
        </motion.p>
      </div>
    </section>
  )
}

export default memo(NotFound)