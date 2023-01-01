import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { motion } from 'framer-motion'
import config from './motion.config'

import { HiMagnifyingGlass } from 'react-icons/hi2'

import { Input } from 'semantic-ui-react'

const SearchBar = ({ setPrefix }) => {
  return (
    <motion.div
      className="filter__function"
      {...config.searchBarAnimation}>
      <div className="filter__function-search-bar">
        <Input icon='search' placeholder='Search...' onChange={e => setPrefix(e.target.value)} />
        {/* <input placeholder="Search" onChange={e => setPrefix(e.target.value)} />
        <HiMagnifyingGlass size="1.4em" className="icon-search" /> */}
      </div>
    </motion.div>
  )
}

SearchBar.propTypes = {
  setPrefix: PropTypes.func.isRequired
}

export default memo(SearchBar)