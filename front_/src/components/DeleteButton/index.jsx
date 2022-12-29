import './styles.scss'

import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'


import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import { HiOutlineTrash } from 'react-icons/hi2'

const DeleteButton = ({ id }) => {
  const navigate = useNavigate()

  const { dispatch } = useBoardsContext()

  const deleteBoard = async () => {
    const response = await axios.delete(`/boards/${id}`)

    dispatch({ type: 'DELETE_BOARD', payload: response.data })
    navigate('/')
  }

  return (
    <motion.div
      className="delete__button"
      onClick={deleteBoard}
      {...config.deleteButtonAnimation}>
      <HiOutlineTrash size="2em" className="delete__button-icon" />
      <p className="delete__button-title">Delete board</p>
    </motion.div>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default DeleteButton;