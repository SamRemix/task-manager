import { memo } from 'react'
import PropTypes from 'prop-types'

import { motion } from 'framer-motion'
import config from './motion.config'

import Loader from '../Loader'

const QueryStatus = ({ loading, error }) => {
  return (
    <section className="container">
      <div className="content">
        {loading && (
          <Loader />
        )}

        {error && (
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        )}
      </div>
    </section >
  )
}

QueryStatus.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any
}

export default memo(QueryStatus)