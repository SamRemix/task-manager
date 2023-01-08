import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useBoards from '../../hooks/useBoards'

import { Form } from 'semantic-ui-react'

const AddBoard = () => {

  const { loading, error, createBoard } = useBoards()

  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    createBoard(title)
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
          <p className="title__input-remaining">{24 - title.length} remaining character{title.length < 23 && 's'}</p>
        </motion.div>

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