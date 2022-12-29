import './styles.scss'

import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'


import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import { Button } from 'semantic-ui-react'
import { HiOutlineTrash } from 'react-icons/hi2'

const DeleteButton = ({ id }) => {
  const [visible, setVisible] = useState(false)

  const navigate = useNavigate()

  const { dispatch } = useBoardsContext()

  const displayMessage = () => {
    !visible ? setVisible(true) : setVisible(false)
  }

  const deleteBoard = async () => {
    const response = await axios.delete(`/boards/${id}`)

    dispatch({ type: 'DELETE_BOARD', payload: response.data })
    navigate('/')
  }

  return (
    <>
      <motion.div
        className="delete__button"
        onClick={displayMessage}
        {...config.deleteButtonAnimation}>
        <HiOutlineTrash size="2em" className="delete__button-icon" />
        <p className="delete__button-title">Delete board</p>
      </motion.div>
      {visible && (
        <>
          <motion.div
            className="backdrop"
            onClick={() => setVisible(false)}
            {...config.backdropAnimation}>
            <motion.div
              className="modal"
              {...config.modalAnimation}>
              <p className="modal-question">Sure ?</p>
              <div className="modal-buttons">
                <Button className="button delete" onClick={deleteBoard}>Delete</Button>
                <Button className="button" onClick={() => setVisible(false)}>cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  )
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired
}

export default DeleteButton;