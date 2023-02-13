import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import config from './motion.config'

import useTagsContext from '../../hooks/useTagsContext'

import Input from '../../components/Input'
import Button from '../../components/Button'
import QueryStatus from '../../components/QueryStatus'

import setDocumentTitle from '../../utils/setDocumentTitle'
import capitalize from '../../utils/capitalize'

const Tags = () => {
  const { tags, error, setError, createTag, deleteTag } = useTagsContext()

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
          <div key={_id} className="tag">
            <p className="tag-title">{capitalize(title)}</p>
            <p onClick={() => deleteTag(_id)}>delete</p>
          </div>
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