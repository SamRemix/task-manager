import './styles.scss'

import PropTypes from 'prop-types'
import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'
import config from './motion.config'

import { formatDistanceToNowStrict } from 'date-fns'

import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import { HiOutlineDocumentText, HiOutlineTrash } from 'react-icons/hi2'

const SingleBoard = ({ _id, title, createdAt }) => {
  console.log(1 * 5);
  const location = useLocation()

  const { dispatch } = useBoardsContext()

  const deleteBoard = async () => {
    const response = await axios.delete(`/boards/${_id}`)

    dispatch({ type: 'DELETE_BOARD', payload: response.data })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="board__content"
        layoutId={_id}
        {...config.singleBoardAnimation}>
        <p className="board__content-title">{title}</p>
        <p className="board__content-date">{formatDistanceToNowStrict(new Date(createdAt))}</p>
        <div className="board__content-buttons-container">
          <Link className="button" to={`${location.pathname}/${_id}`}>
            <HiOutlineDocumentText size="1.4em" className="button-details" />
            <p className="button-title">Details</p>
          </Link>
          <div className="button">
            <HiOutlineTrash size="1.4em" className="button-delete" onClick={deleteBoard} />
            <p className="button-title">Delete</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

SingleBoard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}

export default memo(SingleBoard)