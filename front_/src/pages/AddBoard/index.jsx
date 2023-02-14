import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useBoardsContext } from '../../hooks/useBoardsContext'

import axios from '../../axios.config'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const AddBoard = () => {
  const navigate = useNavigate()

  setDocumentTitle('Add board')

  const { dispatch } = useBoardsContext()

  const [title, setTitle] = useState('')
  const [favorite, setFavorite] = useState(false)

  const [error, setError] = useState('')

  const createBoard = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/boards', { title, favorite })

      dispatch({ type: 'CREATE_BOARD', payload: data })

      navigate(`/boards/${data._id}`)
    } catch (err) {
      setError(err.response.data.error)
    }
  }

  return (
    <section className="container">
      <Header>
        <h1 className="title">Add board</h1>

        <Button type="back" />
      </Header>

      <div className="content">
        <form onSubmit={createBoard}>
          <motion.div {...config.titleInputAnimation}>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => {
                setError('')
                setTitle(e.target.value)
              }}
              maxLength="24"
              focus={true}
              error={error}
            />
          </motion.div>

          <motion.div {...config.favCheckboxAnimation}>
            <Input
              type="checkbox"
              placeholder="Favorite"
              checked={favorite}
              onChange={() => setFavorite(!favorite)}
            />
          </motion.div>

          <motion.div {...config.submitButtonAnimation}>
            <Button type="form-button">Add board</Button>
          </motion.div>
        </form>
      </div>
    </section>
  )
}

export default memo(AddBoard)