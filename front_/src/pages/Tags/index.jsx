import './styles.scss'

import { memo, useState, useContext } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import { TagsContext } from '../../contexts/TagsContext'

import useFetch from '../../hooks/useFetch'
import useToggle from '../../hooks/useToggle'

import TagSettingsModal from './TagSettings.modal'

import Header from '../../components/Header'
import SingleTag from '../../components/SingleTag'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const Tags = () => {
  // set which tag is displayed in modal
  const [tagId, setTagId] = useState('')
  const [title, setTitle] = useState('')

  const { tags } = useContext(TagsContext)

  const { error, setError, fetchData } = useFetch({
    method: 'post',
    url: '/tags',
    type: 'ADD_TAG'
  })
  const { display, toggle } = useToggle()

  const handleCreateTag = e => {
    e.preventDefault()

    fetchData({ title })

    setTitle('')
  }

  setDocumentTitle('Tags')

  return (
    <section className="container tags">
      <Header>
        <h1 className="title">Tags</h1>

        <div className="right-side">
          <div className="tips">
            <p>Create tags to assign them to tasks.</p>
          </div>

          <Button type="back" />
        </div>
      </Header>

      <div className="content">
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
              error={error}
            />
          </motion.div>

          <motion.div {...config.submitButtonAnimation}>
            <Button type="form-button">Add tag</Button>
          </motion.div>
        </form>

        <motion.div
          className="tags-list"
          {...config.tagsContainerAnimation}>
          {tags.map(tag => (
            <SingleTag
              key={tag._id}
              {...tag}
              setTagId={setTagId}
              toggle={toggle}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {display && (
          <Modal toggle={toggle}>
            <TagSettingsModal
              tag={tags.find(({ _id }) => (
                _id === tagId
              ))}
              toggle={toggle}
            />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  )
}

export default memo(Tags)