import './styles.scss'

import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import config from './motion.config'

const SearchBar = ({ setPrefix }) => {
  return (
    <motion.div
      className="filter__function"
      {...config.searchBarAnimation}>
      <div className="filter__function-search-bar">
        <input placeholder="Search" onChange={e => setPrefix(e.target.value)} />
        <span className="material-symbols-outlined button icon-search">search</span>
      </div>
    </motion.div>
  )
}

SearchBar.propTypes = {
  setPrefix: PropTypes.func.isRequired
}

export default SearchBar