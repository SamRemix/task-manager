import './styles.scss'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import config from './motion.config'

const PreviousButton = ({ path }) => {
  return (
    <motion.div
      className="previous-page"
      {...config.btnDeMerde}>
      <Link to={path}>Previous</Link>
    </motion.div>
  )
}

PreviousButton.propTypes = {
  path: PropTypes.string.isRequired
}

export default PreviousButton