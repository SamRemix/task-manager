import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import config from './motion.config'

import { useBoardsContext } from '../../hooks/useBoardsContext'
import useDocumentTitle from '../../hooks/useDocumentTitle'

import axios from '../../axios.config'

import Input from '../../components/Input'
import Button from '../../components/Button'

const AddBoard = () => {
  const navigate = useNavigate()

  useDocumentTitle('Add board')

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
      <Button type="back" />

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
            value={favorite}
            onChange={() => setFavorite(!favorite)}
          />
        </motion.div>

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">Add board</Button>
        </motion.div>
      </form>
    </section>
  )
}

export default memo(AddBoard)