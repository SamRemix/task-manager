import { memo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import { Form } from 'semantic-ui-react'

const AddBoard = () => {
  const navigate = useNavigate()

  useDocumentTitle('Add board')

  const { loading, error, dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: 'LOADING' })

    try {
      const { data } = await axios.post('/boards', { title })

      dispatch({ type: 'CREATE_BOARD', payload: data })

      navigate(`/boards/${data._id}`)
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error })
    }
  }

  return (
    <section className="container">
      <Form onSubmit={handleSubmit}>
        <motion.div {...config.titleInputAnimation}>
          <Form.Input
            type="text"
            onChange={e => setTitle(e.target.value)}
            className={`title__input${error && ' error'}`}
            value={title}
            placeholder="Title"
            maxLength="24"
            autoFocus />
        </motion.div>
        <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>

        <motion.div {...config.submitButtonAnimation}>
          {!loading ? (
            <Form.Button className="submit" content="Add board" secondary />
          ) : (
            <Form.Button className="submit" content="Add board" loading secondary />
          )}
        </motion.div>

        {error && <div
          className="error-message">
          <motion.p
            {...config.errorMessageAnimation}>
            {error}
          </motion.p>
        </div>}
      </Form>
    </section>
  )
}

export default memo(AddBoard)