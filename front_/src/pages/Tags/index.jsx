import './styles.scss'

import { memo, useState, useRef } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import config from './motion.config'

import useTagsContext from '../../hooks/useTagsContext'
import useToggle from '../../hooks/useToggle'

import TagSettingsModal from './TagSettings.modal'

import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Tips from '../../components/Tips'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

import setDocumentTitle from '../../utils/setDocumentTitle'
import capitalize from '../../utils/capitalize'

const Tags = () => {
  const { tags, error, setError, createTag, deleteTag } = useTagsContext()
  const { display, toggle } = useToggle()

  // define modal content
  const [isTagSettingsOpen, setIsTagSettingsOpen] = useState(false)

  // set which tag is displayed by clicking on the tag setting button
  const [tagId, setTagId] = useState('')

  const [title, setTitle] = useState('')

  // focus input on submit
  const titleInput = useRef(null)

  const handleCreateTag = e => {
    e.preventDefault()

    createTag({ title })

    setTitle('')

    titleInput.current.focus()
  }

  setDocumentTitle('Tags')

  return (
    <section className="container tags">
      <header className="tags-header">
        <Button type="back" />

        <Tips>
          <p>Create tags to assign them to tasks.</p>
        </Tips>
      </header>

      <div className="tags-container">
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
              focus={titleInput}
              error={error}
            />
          </motion.div>

          <motion.div {...config.submitButtonAnimation}>
            <Button type="form-button">Add tag</Button>
          </motion.div>
        </form>

        {/* {tags.length > 0 && ( */}
        <motion.div className="tags-container-list" {...config.submitButtonAnimation}>
          {tags.map(({ _id, title }) => (
            <motion.div
              key={_id}
              className="tag"
              layoutId={_id}
              {...config.submitButtonAnimation}>
              <p className="tag-title">{capitalize(title)}</p>
              <div className="tag-footer">
                <div className="button"
                  onClick={() => {
                    setTagId(_id)
                    toggle()
                  }}>
                  <HiOutlinePencilSquare size="1.4em" className="button-update" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* )} */}
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