import PropTypes from 'prop-types'
import { memo } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'

import { Input } from 'semantic-ui-react'

const SearchBar = ({ setPrefix }) => {
  return (
    <motion.div
      className="search-bar"
      {...config.searchBarAnimation}>
      <Input icon='search' placeholder='Search' onChange={e => setPrefix(e.target.value)} />
    </motion.div>
  )
}

SearchBar.propTypes = {
  setPrefix: PropTypes.func.isRequired
}

export default memo(SearchBar)