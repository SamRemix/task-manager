import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useTagsContext from '../../hooks/useTagsContext'

import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Tags = () => {
  const { tags, error, setError, createTag } = useTagsContext()

  setDocumentTitle('Tags')

  const [title, setTitle] = useState('')

  const handleCreateTag = e => {
    e.preventDefault()

    createTag({ title })

    setTitle('')
  }

  return (
    <section className="container tags">
      <header className="tags-header">
        <Button type="back" />
      </header>

      <div className="tags-container">
        {tags.map(({ _id, title }) => (
          <p key={_id}>{title}</p>
        ))}
      </div>

      <form className="tags-form" onSubmit={handleCreateTag}>
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

        <motion.div {...config.submitButtonAnimation}>
          <Button type="form-button">Add tag</Button>
        </motion.div>
      </form>
    </section>
  )
}

export default memo(Tags)