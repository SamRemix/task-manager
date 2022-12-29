import './styles.scss'

import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import PreviousButton from '../../components/PreviousButton'

import { useBoardsContext } from "../../hooks/useBoardsContext"

import axios from '../../axios.config'

import { Button } from 'semantic-ui-react'

const AddBoard = () => {
  const { loading, error, dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')

  const addBoard = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const response = await axios.post('/boards', { title })

      dispatch({ type: 'CREATE_BOARD', payload: response.data })

      setTitle('')
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return (
    <section className="container">
      <motion.h1
        className="container__title"
        {...config.pageTitleAnimation}>
        Add Board
      </motion.h1>

      <PreviousButton path='/boards' />

      <form onSubmit={addBoard}>
        <motion.div
          className="title__input"
          {...config.titleInputAnimation}>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={error && 'error'}
            placeholder="Title"
            maxLength="24"
            autoFocus />
          <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Button className="submit" primary>Add Board</Button>
          ) : (
            <Button className="submit" loading primary></Button>
          )}
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </form>
    </section>
  )
}

export default memo(AddBoard)