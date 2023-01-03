import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { Button } from 'semantic-ui-react'

const AddTaskButton = ({ path }) => {
  return (
    <motion.div
      className="add-task__button"
      {...config.buttonAnimation}>
      <Link to={path}>
        <Button className="link" content="+ Add task" secondary />
      </Link>
    </motion.div>
  )
}

AddTaskButton.propTypes = {
  path: PropTypes.string.isRequired
}

export default memo(AddTaskButton)